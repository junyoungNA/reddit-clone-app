'use client'
import React, {FormEvent, useState} from 'react';
import Inputgroup from '../components/Inputgroup';
import axios from 'axios';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

const Login: React.FC<{}> = () => {
    const router = useRouter();    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErros] = useState<any>({});

    const handleSubmit = async (event : FormEvent) => {
        event.preventDefault();
        try {
            const res =  await axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api/auth/login', {
                password,
                username,
            }, {withCredentials : true});
            console.log(res,'result');
            router.push('/login');
        }catch (error : any){
            console.log('error',error);
            // setErros(error.response.data || {});
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex flex-col items-center justify-center h-screen p-6'>
                <div className='w-10/12 mx-auto md:w-96'>
                    <h1 className='mb-3 text-lg font-bold'>로그인</h1>
                    <form  onSubmit={handleSubmit}>
                        <Inputgroup placehorder='Username' value={username} setValue={setUsername} error={errors.username}/>
                        <Inputgroup placehorder='Password' value={password} setValue={setPassword} error={errors.password}/>
                        <button className='w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border-gray-400 rounded'>
                            로그인
                        </button>
                    </form>
                    <small>
                        아직 아이디가 없나요?
                        <Link href='/register' className='ml-1 text-blue-500 font-bold uppercase '> 회원가입</Link>
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Login;
