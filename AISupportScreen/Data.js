// Nhập dữ liệu data tại đây

const data = [
  {
    id: 1,
    user: 'Xin chào 😘',
    bot: 'Chào bạn! Mình có thể giúp gì cho bạn hôm nay nào?',
    category: 'Chào hỏi'
  },
  {
    id: 2,
    user: 'Cảm ơn nhé',
    bot: 'Không có gì đâu! Mình luôn sẵn sàng giúp đỡ nếu bạn muốn. Chúc bạn sớm tìm được chuyến đi phù hợp nhé 🥳', 
    category: 'Cảm ơn'
  },
  {
    id: 3,
    user: 'Cảm ơn bạn',
    bot: 'Không có gì nè! Mình luôn sẵn sàng giúp đỡ nếu bạn muốn. Chúc bạn sớm tìm được chuyến đi phù hợp nhé 🥳',
    category: 'Cảm ơn'
  },
  {
    id: 4,
    user: 'Cảm ơn bạn rất nhiều',
    bot: 'Rất vui vì có thể giúp đỡ bạn! Nếu bạn cần hỗ trợ thêm bất kỳ điều gì, đừng ngần ngại liên hệ với mình. Chúc bạn có một ngày tuyệt vời và nhiều niềm vui! 😊',
    category: 'Cảm ơn'
  },
  {
    id: 5,
    user: 'Tạm biệt',
    bot: 'Tạm biệt! Hẹn gặp lại bạn lần sau. Chúc bạn có những giây phút trải nghiệm vui vẻ 🥳😍',
    category: 'Tạm biệt'
  },
  {
    id: 6,
    user: 'Byebye',
    bot: 'Tạm biệt! Hẹn gặp lại bạn lần sau. Chúc bạn có những giây phút trải nghiệm vui vẻ 🥳😍',
    category: 'Tạm biệt'
  },
  {
    id: 7,
    user: 'Giúp tôi với',
    bot: 'Bạn có thắc mắc gì à? Để TonTravel luôn ở đây giúp đỡ bạn nhé!',
    category: 'Hỗ trợ'
  },
  {
    id: 8,
    user: 'Tôi muốn liên hệ với tổng đài hỗ trợ',
    bot: 'Bạn có thể tìm số điện thoại hoặc email hỗ trợ trong mục "More" -> "Contact Us". Chúng mình sẽ liên hệ ngay! ☎️😊',
    category: 'Hỗ trợ'
  },
  {
    id: 9,
    user: 'Xin chào! Bạn khỏe không?',
    bot: 'Chào bạn! Sức khỏe của mình vẫn tốt. Mình có thể giúp gì cho bạn hôm nay nào?',
    category: 'Chào hỏi'
  },
  {
    id: 10,
    user: 'Chúc bạn một ngày tốt lành!',
    bot: 'Tạm biệt! Hẹn gặp lại bạn lần sau. Chúc bạn có những giây phút trải nghiệm vui vẻ cùng chúng mình 🥳😍',
    category: 'Tạm biệt'
  },
  // Tiếp tục thêm ở đây này
    {
    id: 11,
    user: 'Tôi không nhớ mật khẩu',
    bot: 'Bạn vui lòng nhấp vào nút "Forgor password" tại màn hình đăng nhập, sau đó làm theo các bước hướng dẫn để reset password',
    category: 'Tài khoản'
  },
    {
    id: 12,
    user: 'Không thể đăng nhập vào tài khoản',
    bot: 'Nếu vẫn không thể đăng nhập vào tài khoản của mình dù đã nhập đúng tên tài khoản và mật khẩu, bạn vui lòng nhấp vào nút "Forgot password" để tiến hành reset lại password bạn nhé! 🥳😍',
    category: 'Tài khoản'
  },
    {
    id: 13,
    user: 'Thông tin thanh toán có an toàn không?',
    bot: 'Yên tâm nhé, mọi thông tin thanh toán của bạn đều được bảo mật tuyệt đối trên ứng dụng của chúng mình. Nếu có thắc mắc, cứ hỏi mình nha! 🔒😊',
    category: 'Bảo mật'
  },
    {
    id: 14,
    user: 'Làm sao để tìm vé giá rẻ?',
    bot: 'Bạn có thể sử dụng chức năng lọc giá trong mục tìm kiếm chuyến bay để tìm giá vé ưng ý.Nếu cần thêm hỗ trợ, hãy báo mình nhé! ✈️😊',
    category: 'Chuyến bay'
  },
    {
    id: 15,
    user: 'Quyền lợi khi trở thành T-member là gì?',
    bot: 'Khi trở thành T-Member, bạn sẽ nhận được các ưu đãi đặc biệt và cập nhật nhanh nhất về khuyến mãi. Đừng bỏ lỡ nhé! 🏅🎉',
    category: 'Quyền lợi'
  },
  {
    id: 16,
    user: 'Làm sao để đặt vé khứ hồi?',
    bot: 'Bạn chỉ cần chọn tùy chọn "Round-trip" khi tìm kiếm chuyến bay. Nếu cần hướng dẫn thêm, mình luôn ở đây để giúp bạn! 🎫😊',
    category: 'Chuyến bay'
  },
  {
    id: 17,
    user: 'Tôi có thể đặt vé cho nhiều người không?',
    bot: 'Được chứ! Bạn chỉ cần chọn số lượng hành khách khi tìm kiếm chuyến bay. Nếu có khó khăn, cứ nhắn mình ngay nhé! 👨‍👩‍👧‍👦✈️',
    category: 'Chuyến bay',
  },
  {
    id: 18,
    user: 'Ứng dụng có hỗ trợ ngôn ngữ khác không?',
    bot: 'Bạn có thể thay đổi ngôn ngữ trong mục "Settings". Nếu có vấn đề gì, mình sẵn sàng hỗ trợ! 🌏✨',
    category: 'Hỗ trợ',
  },
  {
    id: 19,
    user: 'Tôi có thể thanh toán bằng những phương thức nào?',
    bot: 'Bạn có thể thanh toán qua thẻ tín dụng, chuyển khoản và một số ví điện tử phổ biến. Cần hỗ trợ thêm, cứ hỏi mình nhé! 💳📱',
    category: 'Hỗ trợ',
  },
];

export default data;
