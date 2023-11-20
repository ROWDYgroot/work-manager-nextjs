"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import login from '../../assets/login.svg'
// import open from '../../assets/open-eye.svg'
// import close from '../../assets/close-eye.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { logIn } from '@/services/userService'

const Login = () => {

  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState('false')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginData);

    if(loginData.email.trim()==='' || loginData.email === null) {
        toast.warning("Email is required")
        return;
    }
    
    if(loginData.password.trim()==='' || loginData.password === null) {
        toast.warning("Password is required")
        return;
    }

    try {
        const result = await logIn(loginData)
        console.log(result);
        toast.success("user Login Successful")
        router.push("/profile/user");
    } catch (error) {
        console.log(error);
        toast.error(`Login error: ${error.response.data.message}`);
    }
  }

  const handleReset = () => {
    setLoginData({
        email: '',
        password: ''
    })
  }
  return (
    <div className='grid grid-cols-12 justify-center'>
        <div className='col-span-4 col-start-5'>
            <div className='my-4 flex justify-center'>
                <Image src={login} alt='login' style={{width: "50%"}}/>
            </div>
            <div className='py-5'>
                <h1 className='text-3xl text-center'>Login here</h1>
                <form onSubmit={handleLogin} className='mt-5'>
                    <div className='mt-3'>
                        <label htmlFor='user_email' className='block text-sm font-medium mb-2'>
                            Email
                        </label>
                        <input 
                            id='user_email'
                            type='email' 
                            placeholder='Enter UserEmail'
                            name='user_email'
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='user_password' className='block text-sm font-medium mb-2'>
                            Password
                        </label>
                        <input 
                            id='user_password'
                            // type={showPassword ? 'password' : 'text'}
                            type='password' 
                            placeholder='Enter Password'
                            name='user_password'
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
                        />
                        {/* <Image
                            src={showPassword ? open : close}
                            style={{width: '15px'}}
                            alt="Toggle password visibility"
                            onClick={togglePasswordVisibility}
                            className="absolute top-85 right-96 cursor-pointer"
                        />  */}
                    </div>
                    <div className='mt-3 text-center'>
                        <button type='submit' className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>Login</button>
                        <button onClick={handleReset} className='px-3 py-2 bg-orange-600 rounded hover:bg-orange-400 ms-3'>Reset</button>
                    </div>
                    {JSON.stringify(loginData)}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login