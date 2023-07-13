import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth';
import subsRoutes from './routes/subs';
import postsRoutes from './routes/posts';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const origin =process.env.ORIGIN;

app.use(cors({origin, credentials : true}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/',(_,res) => res.send('running'));
app.use('/api/auth', authRoutes);
app.use('/api/subs', subsRoutes);
app.use('/api/posts', postsRoutes);

//이미지 파일을 불러오기 위한 코드
app.use(express.static('public'));

let port = 4000;
app.listen(port, async () => {
    console.log(`server running at http://localhost:${port}`);
    
    AppDataSource.initialize().then(async () => {
        console.log("data initalized...");
    }).catch(error => console.log(error))
})