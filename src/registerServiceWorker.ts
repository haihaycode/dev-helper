/* eslint-disable no-console */
import { register } from "register-service-worker";
if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "Ứng dụng đang được phục vụ từ bộ nhớ cache bởi service worker.\n" +
          "Để biết thêm chi tiết, hãy truy cập https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker đã được đăng ký.");
    },
    cached() {
      console.log("Nội dung đã được lưu vào bộ nhớ cache để sử dụng offline.");
    },
    updatefound() {
      console.log("Nội dung mới đang được tải xuống.");
    },
    updated() {
      console.log("Nội dung mới đã có sẵn; vui lòng làm mới lại trang.");
    },
    offline() {
      console.log(
        "Không tìm thấy kết nối internet. Ứng dụng đang chạy ở chế độ offline."
      );
    },
    error(error) {
      console.error("Lỗi khi đăng ký service worker:", error);
    },
  });
}
