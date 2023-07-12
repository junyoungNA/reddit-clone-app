import {Request, Response,Router ,NextFunction} from 'express';
import dotenv from 'dotenv';
import { User } from '../entities/User';

dotenv.config();

export default async(_: Request , res : Response, next : NextFunction) => {
    try {        
        const user:User | undefined = res.locals.user;
        if(!user) throw new Error ('Unauthenticated');
        return next();
    } catch(error) {
        console.log(error);
        return res.status(400).json({error:'Something went wrong'})
    }
}