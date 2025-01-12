declare module "vue-captcha-code" {
  import { DefineComponent } from "vue";

  const CaptchaCode: DefineComponent<{
    // Định nghĩa các props cần thiết ở đây
    captcha: string;
    // Thêm các props khác nếu cần
  }>;

  export default CaptchaCode;
}
