import { NextFunction, Request, Response } from "express";
import AppError from "../../../utils/appError";

const errorHandlingMidlleware=(err:AppError, req:Request, res:Response, next: NextFunction)=>{
    console.log(err,"errorHandlingMidlleware");
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.statusCode === 404) {
        res.status(err.statusCode).json({ errors: err.status, errorMessage: err.message })
    } else {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })  
    }
}

export default errorHandlingMidlleware