/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Hooks, register } from "register-service-worker";

const handleServiceWorkerEvents = (serviceWorker: {
  (swUrl: string, hooks?: Hooks): void;
  ready?: any;
  registered?: any;
  cached?: any;
  updatefound?: any;
  updated?: any;
  offline?: any;
  error?: any;
}) => {
  serviceWorker.ready = () => {
    console.log(
      "Ứng dụng đang được phục vụ từ bộ nhớ cache bởi service worker.\n" +
        "Để biết thêm chi tiết, hãy truy cập https://goo.gl/AFskqB"
    );
  };

  serviceWorker.registered = () => {
    console.log("Service worker đã được đăng ký.");
  };

  serviceWorker.cached = () => {
    console.log("Nội dung đã được lưu vào bộ nhớ cache để sử dụng offline.");
  };

  serviceWorker.updatefound = () => {
    console.log("Nội dung mới đang được tải xuống.");
  };

  serviceWorker.updated = () => {
    console.log("Nội dung mới đã có sẵn. Vui lòng làm mới lại trang.");
    // Hiển thị thông báo cho người dùng biết có bản cập nhật mới
    alert(
      "Có bản cập nhật mới. Vui lòng làm mới trang để sử dụng phiên bản mới."
    );
  };

  serviceWorker.offline = () => {
    console.log(
      "Không tìm thấy kết nối internet. Ứng dụng đang chạy ở chế độ offline."
    );
  };

  serviceWorker.error = (error: any) => {
    console.error("Lỗi khi đăng ký service worker:", error);
    // Thông báo lỗi cho người dùng
    alert("Đã xảy ra lỗi khi đăng ký service worker. Vui lòng thử lại.");
  };
};

const registerServiceWorker = async () => {
  if (process.env.NODE_ENV === "production") {
    try {
      await register(`${process.env.BASE_URL}service-worker.js`);
      handleServiceWorkerEvents(register);
      console.log("Service Worker đăng ký thành công.");
    } catch (error) {
      console.error("Đăng ký Service Worker thất bại:", error);
      alert("Đã xảy ra lỗi khi đăng ký Service Worker. Vui lòng thử lại.");
    }
  }
};

registerServiceWorker();
