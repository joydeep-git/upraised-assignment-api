import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";


// config
dotenv.config();


const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";

  if (process.env.NODE_ENV === "production") {
    res.status(statusCode).json({
      success: err?.success ?? false,
      statusCode,
      message
    })
  } else {
    res.status(statusCode).json({
      success: err?.success ?? false,
      statusCode,
      message,
      stack: err.stack || "No stack trace available"
    });
  }

};

export default errorMiddleware;