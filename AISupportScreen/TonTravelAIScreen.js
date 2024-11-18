import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  Dimensions,
  UIManager,
  Keyboard,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import data from './Data'; // Import dữ liệu từ file data.js
import levenshtein from 'fast-levenshtein'; // Sử dụng thư viện Levenshtein để so khớp chuỗi

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TonTravelAIScreen = () => {
  const [messages, setMessages] = useState([]); // Danh sách tin nhắn
  const [input, setInput] = useState(''); // Nội dung nhập
  const [isLoading, setIsLoading] = useState(false); // Đang xử lý
  const [showIntro, setShowIntro] = useState(true); // Hiển thị phần intro
  const [renderedBotMessages, setRenderedBotMessages] = useState(new Set()); // Theo dõi các tin nhắn bot đã được render
  const [isBotDone, setIsBotDone] = useState(false); // Khi bot render xong mới cho phép bấm các suggestions
  const [showSuggestions, setShowSuggestions] = useState(true); // Thêm state để điều khiển hiển thị gợi ý
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef(null);

  // Scroll to the end of FlatList
  const scrollToEnd = () => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 120); // Delay to allow layout stabilization
  };

  // Handle keyboard events and adjust height
  useEffect(() => {
    const onKeyboardShow = (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      scrollToEnd();
    };
    const onKeyboardHide = () => {
      setKeyboardHeight(0);
      scrollToEnd();
    };

    const keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow
    );
    const keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  // Scroll to the end when new messages arrive or isLoading changes
  useEffect(() => {
    scrollToEnd();
  }, [messages, isLoading]);

  // Data suggestion
  const suggestions = [
    { id: '1', text: 'Xin chào 😘' },
    { id: '2', text: 'Cảm ơn' },
    { id: '3', text: 'Tạm biệt' },
    { id: '4', text: 'Giúp tôi với' },
  ];

  // Hàm bắt đầu chat
  const startChat = () => {
    setShowIntro(false);
    const initialBotMessage = {
      id: Date.now().toString(),
      text: 'Chào mừng bạn đến với siêu AI, mình có thể giúp gì cho bạn?',
      sender: 'bot',
    };
    setMessages([initialBotMessage]); // Khởi tạo tin nhắn đầu tiên
    setShowSuggestions(true); // Hiển thị gợi ý khi bắt đầu chat
  };

  // Hàm gửi tin nhắn
  const sendMessage = async (messageText) => {
    const text = messageText || input.trim();
    if (!text) return; // Bỏ qua nếu không có nội dung

    const userMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    };

    // Cập nhật tin nhắn người dùng
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(''); // Xóa nội dung nhập
    setIsLoading(true); // Hiển thị loading
    setIsBotDone(false); // Khóa các button gợi ý khi bắt đầu gửi tin nhắn
    setShowSuggestions(false); // Tắt hiển thị gợi ý sau khi người dùng chọn

    // Kiểm tra câu trả lời tự động dựa trên dữ liệu có sẵn
    const match = data.find(
      (d) =>
        levenshtein.get(text.toLowerCase(), d.user.toLowerCase()) <=
        d.user.length * 0.85
    );

    if (match) {
      const newBotMessage = {
        id: Date.now().toString(),
        text: match.bot,
        sender: 'bot',
      };

      // Cập nhật tin nhắn bot
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsLoading(false); // Tắt loading
    } else {
      // Nếu không có câu trả lời tự động, giả lập API trả lời
      setTimeout(() => {
        const newBotMessage = {
          id: Date.now().toString(),
          text: 'Cảm ơn bạn đã gửi tin nhắn. Mình có thể giúp gì thêm không?',
          sender: 'bot',
        };

        // Cập nhật tin nhắn bot
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        setIsLoading(false); // Tắt loading
      }, 1000);
    }
  };

  // Hàm để render tin nhắn bot với hiệu ứng
  const AnimatedMessage = ({ text, style, onEnd }) => {
    const [showText, setShowText] = useState('');
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (text) {
        setShowText(''); // Đặt lại văn bản hiển thị trước khi bắt đầu

        // Tổng thời gian hiệu ứng dựa trên độ dài văn bản
        const baseDuration = 1000; // Thời gian tối thiểu (ms)
        const extraDurationPerChar = 50; // Thời gian thêm mỗi ký tự (ms)
        const totalDuration = baseDuration + text.length * extraDurationPerChar;

        // Reset Animated.Value
        animationValue.setValue(0);

        // Animation điều khiển giá trị từ 0 -> 1
        Animated.timing(animationValue, {
          toValue: 1,
          duration: totalDuration,
          useNativeDriver: false, // Cần false vì chúng ta thao tác với text
        }).start(() => {
          setShowText(text); // Đảm bảo văn bản đầy đủ khi kết thúc
          onEnd && onEnd();
          setIsBotDone(true); // Mở khóa các button gợi ý
        });

        // Lắng nghe giá trị animation để cập nhật văn bản hiển thị
        const chars = Array.from(text); // Sử dụng Array.from để xử lý ký tự Unicode
        animationValue.addListener(({ value }) => {
          const numCharsToShow = Math.floor(value * chars.length);
          setShowText(chars.slice(0, numCharsToShow).join(''));
        });

        // Dọn dẹp listener
        return () => {
          animationValue.removeAllListeners();
        };
      }
    }, [text]);

    return (
      <View style={style}>
        <Text style={styles.messageText}>{showText}</Text>
      </View>
    );
  };

  // Hàm render tin nhắn
  const renderMessage = ({ item }) => {
    const messageStyle =
      item.sender === 'user' ? styles.userMessage : styles.botMessage;

    const messageText = item.text || '';

    if (item.sender === 'bot' && !renderedBotMessages.has(item.id)) {
      return (
        <AnimatedMessage
          text={messageText}
          style={[styles.message, messageStyle]}
          onEnd={() =>
            setRenderedBotMessages((prev) => new Set(prev).add(item.id))
          }
        />
      );
    }

    return (
      <View style={[styles.message, messageStyle]}>
        <Text style={styles.messageText}>{messageText}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {showIntro ? (
        <View style={styles.introContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.logo}
          />
          <Text style={styles.introText}>
            Xin chào, mình là siêu AI đồng hành cùng bạn!
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={startChat}>
            <Text style={styles.startButtonText}>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            style={styles.chatArea}
            contentContainerStyle={{ paddingTop: 30 }}
            onContentSizeChange={scrollToEnd}
          />
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#007AFF"
              style={styles.loading}
            />
          )}
          {showSuggestions && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.suggestionButton,
                    { opacity: isBotDone ? 1 : 0.5 },
                  ]}
                  onPress={() => sendMessage(item.text)}
                  disabled={!isBotDone}>
                  <Text style={styles.suggestionText}>{item.text}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.suggestionContainer}
              numColumns={2}
              style={{ maxHeight: '25%' }}
              keyboardShouldPersistTaps="handled"
            />
          )}
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Nhập nội dung..."
              autoCorrect={false}
              onFocus={() =>
                flatListRef.current.scrollToEnd({ animated: true })
              }
              editable={isBotDone} // Lock the TextInput when bot is processing
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => sendMessage(input)}
              disabled={!isBotDone}>
              <MaterialCommunityIcons
                name="send-circle-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  chatArea: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#F5FDFF',
  },
  message: {
    marginVertical: 15,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  messageText: { color: '#000' },
  suggestionContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  suggestionButton: {
    backgroundColor: '#E5E5EA',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    flexBasis: '45%',
    alignItems: 'center',
    height: 150,
  },
  suggestionText: {
    color: '#000',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  loading: { marginVertical: 10 },
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: 30,
  },
  logo: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  introText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default TonTravelAIScreen;
