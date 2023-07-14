import Link from 'next/link'
import React from 'react'
import { useAuthDispatch, useAuthState } from '../context/auth'
import axios from 'axios';
import Image from 'next/image';
import {FaSearch} from 'react-icons/fa'
export const Navbar: React.FC<{}> = () => {
    const {loading, authenticated} = useAuthState();
    const dispatch = useAuthDispatch();
    const handleLogout = () => {
        axios.post('/auth/logout').then(() => {
            dispatch('LOGOUT');
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-between h-14 px-5 bg-white'>
            <span className='text-2xl font-semibold text-gray-400'>
                <Link href='/'> 
                    <Image src='/logo.png' alt='logo' width={130} height={130}></Image>
                </Link>
            </span>
            <div className='max-w-full px-4'>
                <div className='relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white'>
                    <FaSearch className='ml-2 text-gray-400'/>
                    <input type="text" 
                    placeholder='Search Reddit'
                    className='px-3 py-1 h-7 bg-transparent rounded focus:outline-none'/>
                </div>
            </div>
            <div className='flex'>
                {!loading &&( authenticated ? (<button className='w-20 px-2 mr-2 text-sm text-white bg-gray-400 rounded text-center h-7' 
                onClick={handleLogout}>
                        로그아웃
                    </button>): (<>
                <Link href='/login' className='w-20 px-2 pt-0.5 mr-2 text-center text-blue-500 border border-blue-500 ronded h-7'>
                    로그인
                </Link>
                <Link href='/register'className='w-20 px-2 pt-0.5 text-center text-white bg-gray-400 rounded h-7'> 회원가입</Link>
                </>) )}
            </div>
        </div>
    )
}