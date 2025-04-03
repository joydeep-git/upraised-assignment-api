class ErrorHandler extends Error {

  public statusCode: number;
  public success: boolean;

  constructor({
    status,
    message,
    success,
  }: {
    success?: boolean;
    status?: number;
    message?: string;
  }) {
    super(message || "Something went wrong!");
    this.statusCode = status || 500;
    this.success = success || false;
  }
}

export default ErrorHandler;
