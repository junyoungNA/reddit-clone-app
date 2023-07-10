import Axios from 'axios';

export default function Home() {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api'; 
  return (
    <h4 className='text-bold underline'> 얀냥</h4>
    )
}
