'use client'
import React, {FormEvent, useState} from 'react';
import Link from 'next/link';
import Inputgroup from '../components/Inputgroup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErros] = useState<any>({});
    const router = useRouter();    
    
    const handleSubmit = async (event : FormEvent) => {
        event.preventDefault();
        try {
            const res =  await axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api/auth/register', {
                email,
                password,
                username,
            });
            console.log(res,'result');
            router.push('/login');
        }catch (error : any){
            console.log('error',error);
            setErros(error.response.data || {});
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex flex-col items-center justify-center h-screen p-6'>
                <div className='w-10/12 mx-auto md:w-96'>
                    <h1 className='mb-3 text-lg font-bold'>회원가입</h1>
                    <form  onSubmit={handleSubmit}>
                        <Inputgroup placehorder='Email' value={email} setValue={setEmail} error={errors.email}/>
                        <Inputgroup placehorder='Username' value={username} setValue={setUsername} error={errors.username}/>
                        <Inputgroup placehorder='password' value={password} setValue={setPassword} error={errors.password}/>
                        <button className='w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border-gray-400 rounded'>
                            회원가입
                        </button>
                    </form>
                    <small>
                        이미 가입하셨나요?
                        <Link href='/login' className='ml-1 text-blue-500 font-bold uppercase '> 로그인</Link>
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Register;