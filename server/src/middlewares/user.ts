import {Request, Response,Router ,NextFunction} from 'express';
import dotenv from 'dotenv';
import jwt  from 'jsonwebtoken';
import { User } from '../entities/User';

dotenv.config();

export default async(req: Request , res : Response, next : NextFunction) => {
    try {        
        const token = req.cookies.token;
        if(!token) return next();

        const {username} : any = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOneBy({username})
        if(!user) throw new Error ('Unauthenticated');

        //유저 정보를 res.local.user에 넣어주기
        res.locals.user = user;
    } catch(error) {
        console.log(error);
        return res.status(400).json({error:'Something went wrong'})
    }
}