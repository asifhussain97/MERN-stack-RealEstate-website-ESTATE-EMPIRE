import { HttpStatus } from '../types/httpStatus';

class AppError extends Error {
 
  
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: HttpStatus) {
    super(message);

    this.statusCode = statusCode;
    this.status =  message;
    this.isOperational = true;

   
  }
}

export default AppError;