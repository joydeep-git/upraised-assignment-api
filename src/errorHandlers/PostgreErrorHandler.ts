
import { DatabaseError } from 'pg';
import ErrorHandler from './ErrorHandler';
import { statusCode } from '../constants/constants';

const postgreErrorHandler = (err: DatabaseError) => {

  let status: number = statusCode.INTERNAL_SERVER_ERROR;
  let message = "Database Error";


  switch (err.code) {

    case "23505":
      status = statusCode.CONFLICT;
      message = "Duplicate key violation";
      break;
    
    case "23503":
      status = statusCode.NOT_FOUND;
      message = "Foreign key constraint violation";
      break;
    
    case "23502":
      status = statusCode.BAD_REQUEST;
      message = "Null value violation";
      break;
    
  };


  return new ErrorHandler({
    status,
    message: err.message || message,
    success: false,
  });

}

export default postgreErrorHandler;