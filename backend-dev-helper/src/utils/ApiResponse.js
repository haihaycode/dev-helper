class ApiResponse {
  constructor(data = null, message = null) {
    this.timestamp = new Date().toISOString();
    this.data = data;
    this.message = message;
  }

  static success(data = null, message = "Thành công") {
    return {
      success: true,
      timestamp: new Date().toISOString(),
      data,
      message,
      error: null,
    };
  }

  static error(message = "Lỗi", error = null, stack = null) {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      data: null,
      message,
      error: {
        details: error,
        stack: process.env.NODE_ENV === "development" ? stack : undefined,
      },
    };
  }
}

module.exports = ApiResponse;
