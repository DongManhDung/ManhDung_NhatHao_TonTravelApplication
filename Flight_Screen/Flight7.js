import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Alert
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as Print from 'expo-print';

const Flight7 = ({ navigation, route }) => {

  const {
    item,
    seatClass,
    selectedDate,
    totalPassengers,
    passengerDetails,
    selectedSeats,
    adultCount,
    childCount,
    price,
    gate,
    bookingCode,
  } = route.params;

  // Hàm để tính thời gian trước 15 phút
  const calculateArrivalTime = (timeStart) => {
    const time = new Date(`1970-01-01T${timeStart}:00`); // Chuyển đổi string sang Date
    time.setMinutes(time.getMinutes() - 15); // Trừ 15 phút
    return time.toTimeString().slice(0, 5); // Trả về chuỗi giờ:phút
  };
  
  const gateArrivalTime = calculateArrivalTime(item.timeStart);


  const generateHTMLContent = (item, seatClass, selectedDate, totalPassengers, passengerDetails,
    selectedSeats, adultCount, childCount, price, gate, bookingCode) => {

    let htmlContent  =`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Ticket</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .boarding-pass {
            border: 1px solid #ddd;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }

        .boarding-pass h5 {
            margin-bottom: 10px;
        }

        .boarding-pass .details {
            font-size: 0.9rem;
        }

        .boarding-pass .qr-code img {
            width: 100px;
            height: 100px;
        }

        .boarding-pass .note {
            font-size: 0.85rem;
            color: gray;
        }

        .boarding-pass .logo {
            max-width: 120px;
            margin-bottom: 15px;
        }

        .boarding-pass img {
            max-width: 100%;
        }
    </style>
</head>

<body>
    <div class="container my-4 border p-4">
        <!-- Header -->
        <div class="row align-items-center mb-4">
            <!-- Left Section -->
            <div class="col-4">
                <h4 class="mb-1">${item.airline}</h4>
                <p class="text-muted mb-0">${seatClass}</p>
            </div>
        
            <!-- Logo in the Middle -->
            <div class="col-4 text-center">
                <img src="${item.logo}" alt="Airplane Logo" class="img-fluid" style="max-width: 80px;">
            </div>
        
            <!-- Right Section -->
            <div class="col-4 text-end">
                <p class="mb-0">Mã đặt chỗ: <strong>${bookingCode}</strong></p>
                <p class="mb-0">Vé điện tử: 738 2449628765</p>
                <p class="mb-0">Số thứ tự: 00015</p>
            </div>
        </div>

        <!-- Continue here -->
            <p class="mb-1"><strong>${item.startPlace} ✈ ${item.endPlace}</strong></p>
            <p>Chặng: Từ ${item.startPlaceAirportVNLang} đến ${item.endPlaceAirportVNLang}</p>
            <p>Route: From: ${item.startPlaceAirportENLang} to ${item.endPlaceAirportENLang}</p>
        </div>

        <!-- Flight Details -->
        <div class="row border p-3 mb-4 text-center">
            <div class="col-4">
                <p class="mb-1">Chuyến bay/Flight</p>
                <p><strong>${item.flightNumber}</strong></p>
                <p>${selectedDate}</p>
            </div>
            <div class="col-4 text-center">
                <p class="mb-1">Cửa lên máy bay/Gate</p>
                <p><strong>${gate}</strong></p>
            </div>
            <div class="col-4 text-center">
                <p class="mb-1">Giờ có mặt tại cửa lên máy bay/Gate arrival time</p>
                <!-- Update minus 30 minutes from timeStart here -->
                <p><strong>${gateArrivalTime}</strong></p>
                <p>Giờ khởi hành/Boarding time </p>
                <p><strong>${item.timeStart}</strong></p>
            </div>
        </div>

        <!-- Baggage Details -->
        <div class="row text-center border p-3 mb-4">
            <div class="col">
                <p>Ký gửi</p>
                <p>-N/A-</p>
            </div>
            <div class="col">
                <p>Trong lượng</p>
                <p>-N/A-</p>
            </div>
            <div class="col">
                <p>Nhóm</p>
                <p><strong>-N/A-</strong></p>
            </div>
        </div>`;


        passengerDetails.forEach((passenger, index) => {
            htmlContent  += `
            <!-- Boarding Pass Section -->
            <div class="boarding-pass">
                <h5 class="text-center">Thẻ Lên Máy Bay / Boarding Pass</h5>
                <div class="row">
                    <div class="col-md-8">
                        <div class="details">
                            <p><strong>Họ và tên/Name:</strong> ${passenger.fullName} - ${passenger.gender}</p>
                            <p><strong>Nơi đi/From:</strong> ${item.startPlaceFullname} (${item.startPlace})</p>
                            <p><strong>Nơi đến/To:</strong> ${item.endPlaceFullname} (${item.endPlace})</p>
                            <p><strong>Ngày/Date:</strong> ${selectedDate}</p>
                            <p><strong>Giờ khởi hành/Departure Time:</strong> ${item.timeStart}</p>
                            <p><strong>Chỗ ngồi/Seat:</strong>  ${selectedSeats[index]}</p>
                            <p><strong>Chuyến bay/Flight:</strong> ${item.flightNumber}</p>
                            <p><strong>Cửa/Gate:</strong> ${gate}</p>
                        </div>
                    </div>
                    <div class="col-md-4 text-center qr-code">
                        <img src="qr-code-placeholder.png" alt="QR Code">
                    </div>
                </div>
                <p class="note">Cửa ra máy bay sẽ đóng 15 phút trước giờ khởi hành. Hành khách không được chấp nhận nếu đến muộn. <br>
                    <span class="en">Gate closes 15 minutes before departure time. Late passenger may not be accepted for travel.</span>
                </p>
            </div>`;
    });

    htmlContent  += `
        <!-- Notes Section -->
        <div class="border p-3">
            <!-- Vie Lang -->
            <h6 class="text-uppercase">Lưu ý quan trọng:</h6>
            <ul class="small">
                <li>Quý khách cần mang đầy đủ vé máy bay, thẻ lên máy bay, và giấy tờ tùy thân để thực hiện chuyến bay, thu xếp có mặt tại sân bay sớm, đủ thời gian để làm các bước thủ tục cần thiết.</li>
                <li>Cửa lên máy bay có thể đóng sớm 15 phút trước giờ khởi hành, quý khách cần đến sớm.</li>
                <li>Đối với chuyến bay quốc tế muộn nhất 15 phút trước thời điểm kết thúc làm thủ tục. Quý khách cần qua quầy làm thủ tục trực tuyến để xác nhận thẻ lên máy bay và kiểm tra giấy tờ tùy thân.</li>
                <li>Cửa ra máy bay có thể thay đổi và được thông bóa trên các màn hình tại sân bay. Cửa sẽ đóng 15 phút trước giờ khởi hành. Quý khách đến muộn sẽ không được chấp nhận vận chuyển.</li>
                <li>Nếu quý khách muốn thay đổi chuyến bay hoặc hủy làm thủ tục trực tuyến, Quý khách vui lòng liên hệ với văn phòng chi nhánh của hãng bay tương ứng.</li>
                <li>Để biết thêm thông tin, vui lòng truy cập <a href="${item.website}">${item.website}</a>.</li>
            </ul>
            <p class="text-center fw-bold">Cảm ơn quý khách. Chúc Quý khách chuyến bay tốt đẹp!</p>

            <!-- Eng Lang -->
            <h6 class="text-uppercase">Important note:</h6>
            <ul class="small">
                <li>You need to bring your flight ticket, boarding pass, and ID to make the flight, arrange to be at the airport early, and have enough time to complete the necessary procedures.</li>
                <li>Boarding gates may close as early as 15 minutes before departure time, you need to arrive early.</li>
                <li>For international flights, no later than 15 minutes before the end of check-in. You will need to go through the online check-in counter to confirm your boarding pass and check your ID.</li>
                <li>Aircraft doors are subject to change and are displayed on screens at the airport. Doors will close 15 minutes before departure time. Late arrivals will not be accepted for carriage.</li>
                <li>If you wish to change your flight or cancel online check-in, please contact the branch office of the respective airline.</li>
                <li>For more information, please visit <a href="${item.website}">${item.website}</a>.</li>
            </ul>
            <p class="text-center fw-bold">Thank you. Have a good flight!</p>
        </div>
        
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>`;
  return htmlContent;
};

  const printPDF = async (item, seatClass, selectedDate, totalPassengers, passengerDetails,
    selectedSeats, adultCount, childCount, price, gate, bookingCode) => {
      const htmlContent = generateHTMLContent(item, seatClass, selectedDate, totalPassengers, passengerDetails, selectedSeats, adultCount, childCount, price, gate, bookingCode);
    try {
      await Print.printAsync({ html: htmlContent});
      console.log("PDF đã được in!");
    } catch (error) {
      console.log("Lỗi khi in PDF:", error);
    }
  };

  printPDF(item, seatClass, selectedDate, totalPassengers, passengerDetails,
    selectedSeats, adultCount, childCount, price, gate, bookingCode);

  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        <View style={style.containerFlud}>
          <View style={style.backGroup}>
            <View style={style.backItem}>
              <TouchableOpacity
                style={{ width: "10%", height: 35 }}
                onPress={() => navigation.goBack()}
              >
                <AntIcon
                  name="arrowleft"
                  size={35}
                  style={{ bottom: 10 }}
                ></AntIcon>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            opacity={0.35}
            style={{
              width: "100%",
              height: 250,
              objectFit: "cover",
              position: "absolute",
              zIndex: -1,
            }}
            source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
          ></Image>

          <View style={style.formContainer}>
            <View style={style.formFlud}>
              <View style={style.logoContainer}>
                <Image
                  style={{ width: "70%", height: "100%", objectFit: "cover" }}
                  source={require("../assets/ImgDesign/tontravel-logo-zip-file/RemoveBg/logo.png")}
                ></Image>
              </View>

              <View style={style.correctIconContainer}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  source={require("../assets/ImgDesign/Flight Screen/Payment/done_icon-removebg-preview.png")}
                ></Image>
              </View>

              <View style={style.successTextContainer}>
                <Text
                  style={[
                    style.text,
                    style.textCenter,
                    { width: "60%", letterSpacing: 0.65 },
                  ]}
                >
                  Your ticket purchase successfully completed
                </Text>
              </View>

              {/* Test insert data here */}
              <View style={style.boardingPassContainer}>
                {/* <Text>Fullname: {passengerDetails[0].fullName}</Text>
                  <Text>Gender: {passengerDetails[0].gender}</Text>
                  <Text>Class: {item.class}</Text> */}
              </View>

              <View style={style.thanksContainer}>
                <View style={style.thankFlud}>
                  <Text
                    style={[
                      style.text,
                      style.textCenter,
                      { width: "50%", letterSpacing: 0.65 },
                    ]}
                  >
                    Thank you for using our service.
                  </Text>
                  {/* <Image 
                        style={{width: '40%', height: '100%', objectFit: 'cover'}}
                        source={require('../assets/ImgDesign/Flight Screen/qr_code_PNG6.png')}></Image> */}
                </View>
              </View>

              <View style={style.footerBtnContainer}>
                <TouchableOpacity style={style.footerBtn} onPress={() => printPDF()}>
                    <Text>Download E-ticket</Text>  
                </TouchableOpacity>                     
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Flight7;

const style = StyleSheet.create({
  miniText: {
    fontSize: 12,
    letterSpacing: 0.25,
  },
  boldText: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 17,
    letterSpacing: 0.25,
  },
  text15: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  bigText: {
    fontSize: 25,
    letterSpacing: 0.5,
  },
  biggerFont: {
    fontSize: 19,
    fontWeight: "500",
  },
  textCenter: {
    textAlign: "center",
  },
  textBlur: {
    color: "#808080",
  },
  safeText: {
    color: "#088F08",
  },
  textInput100: {
    width: "95%",
    height: "100%",
    backgroundColor: "#f6f5f5",
    fontSize: 17,
    letterSpacing: 0.5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  lineThroughText: {
    fontSize: 17,
    textDecorationLine: "line-through",
  },
  costBigRedText: {
    fontSize: 20,
    color: "#A40303",
  },
  icon4040: {
    width: 40,
    height: 40,
  },
  icon6040: {
    width: 60,
    height: 40,
    objectFit: "contain",
    borderRadius: 10,
  },
  imageCover: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imgIcon: {
    width: "15%",
    height: "60%",
    objectFit: "cover",
  },
  inputText: {
    width: "70%",
    height: "100%",
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    marginRight: 5,
  },
  left25Container: {
    width: "25%",
  },
  rowDirectionGroup: {},
  container: {
    flex: 1,
    flexDirection: "column",
  },

  containerFlud: {
    width: "100%",
    height: 950,
    backgroundColor: "#CAF0F8",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  backGroup: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  backItem: {
    width: "95%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    bottom: 15,
    letterSpacing: 0.75,
  },
  formContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  formFlud: {
    width: "95%",
    height: "100%",
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    borderColor: "gray",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  logoContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  correctIconContainer: {
    width: "100%",
    height: 140,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  successTextContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  boardingPassContainer: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  thanksContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  thankFlud: {
    width: "95%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  footerBtnContainer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'cyan',
  },
  footerBtn: {
    width: "70%",
    height: "70%",
    backgroundColor: "#48CAE4",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
});
