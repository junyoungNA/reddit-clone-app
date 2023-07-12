import Link from 'next/link'
import React from 'react'
import { useAuthDispatch, useAuthState } from '../context/auth'
import axios from 'axios';

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
        <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-between h-16 px-5 bg-white'>
            <span className='text-2xl font-semibold text-gray-400'>
                <Link href='/'>Community</Link>
            </span>
            <div className='max-w-full px-4'>
                <div className='relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white'>
                    <input type="text" 
                    placeholder='Search...'
                    className='px-3 py-1 bg-transparent rounded focus:outline-none'/>
                </div>
            </div>
            <div className='flex'>
                {!loading &&( authenticated ? (<button className='w-20 p-2 mr-2 text-center' 
                onClick={handleLogout}>
                        로그아웃
                    </button>): (<>
                <Link href='/login' className='w-20 p-2 mr-2 text-center text-blue-500 border rounded-tl-md border-blue-500 ronded'>
                    로그인
                </Link>
                <Link href='/register'className='w-20 p-2 text-center text-white bg-gray-400 rounded'> 회원가입</Link>
                </>) )}
            </div>
        </div>
    )
}