import { NextFunction, Request, Response } from "express";
import { HttpStatus } from '../../../types/httpStatus';
import { authService } from '../../services/authService';

const authServiceMiddleware = authService();

export default async function jwtTokenVerification(req: Request, res: Response, next: NextFunction) {
    let token: string | null = '';
   
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
 

    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'Token not found' });
    }

    try {
        const payload: any = await authServiceMiddleware.verifyToken(token);

        next();
    } catch (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'UnAuthorized User' });
    }
}