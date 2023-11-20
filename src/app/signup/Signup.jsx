"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import signup from '../../assets/signup.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { signUp } from '@/services/userService'
import { useRouter } from 'next/navigation'

const Signup = () => {

  const router = useRouter();  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOm2LuId_WkIuaCpuGYldjjC1c_Zi134yRg&usqp=CAU"
  })

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(data);
    // if(name.trim()==='' || data.name === null) {
    //     toast.warning("Name is required")
    //     return;
    // }
    //do the same for the other fields as well

    try {
        const result = await signUp(data)
        console.log(result);
        toast.success("user is registered")
        setData({
            name: '',
            email: '',
            password: '',
            about: '',
            profileURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOm2LuId_WkIuaCpuGYldjjC1c_Zi134yRg&usqp=CAU'
        })
        router.push("/profile/user");
    } catch (error) {
        console.log(error);
        // console.log(error.response.data.message);
        toast.error(`Signup error: ${error.response.data.message}`);

    }
  }

  const handleReset = () => {
    setData({
        name: '',
        email: '',
        password: '',
        about: '',
        profileURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOm2LuId_WkIuaCpuGYldjjC1c_Zi134yRg&usqp=CAU'
    })
  }
  return (
    <div className='grid grid-cols-12 justify-center'>
        <div className='col-span-4 col-start-5'>
            <div className='my-4 flex justify-center'>
                <Image src={signup} alt='signup' style={{width: "50%"}}/>
            </div>
            <div className='py-5'>
                <h1 className='text-3xl text-center'>SignUp here</h1>
                <form onSubmit={handleSignup} className='mt-5'>
                    <div className='mt-3'>
                        <label htmlFor='user_name' className='block text-sm font-medium mb-2'>
                            Username
                        </label>
                        <input 
                            id='user_name'
                            type='text' 
                            placeholder='Enter Username'
                            name='user_name'
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                            className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='user_email' className='block text-sm font-medium mb-2'>
                            Email
                        </label>
                        <input 
                            id='user_email'
                            type='email' 
                            placeholder='Enter UserEmail'
                            name='user_email'
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                            className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='user_password' className='block text-sm font-medium mb-2'>
                            Password
                        </label>
                        <input 
                            id='user_password'
                            type='password' 
                            placeholder='Enter Password'
                            name='user_password'
                            value={data.password}
                            onChange={(e) => setData({...data, password: e.target.value})}
                            className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='user_about' className='block text-sm font-medium mb-2'>
                            About
                        </label>
                        <textarea 
                            id='user_about'
                            placeholder='Enter about yourself....'
                            name='user_about'
                            value={data.about}
                            onChange={(e) => setData({...data, about: e.target.value})}
                            className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
                            rows={5}
                        ></textarea>
                    </div>
                    <div className='mt-3 text-center'>
                        <button type='submit' className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>Signup</button>
                        <button onClick={handleReset} className='px-3 py-2 bg-orange-600 rounded hover:bg-orange-400 ms-3'>Reset</button>
                    </div>
                    {/* {JSON.stringify(data)} */}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup