'use client'
import React from 'react'

const Footer = () => {
  return (
    <footer className='h-40 bg-blue-600 mt-5'>
        <div className='flex p-5 justify-around'>
            <div className='text-center flex flex-col justify-center'>
                <h1 className='text-3xl'>Welcome to work manager</h1>
                <p>lorem10</p>
            </div>
            <div className='text-center'>
                <h1>Importnat Links</h1>
                <ul>
                    <li><a href='#!'>Facebook</a></li>
                    <li><a href='#!'>YouTube</a></li>
                    <li><a href='#!'>Instagram</a></li>
                </ul>
            </div>
        </div>

    </footer>
  )
}

export default Footer