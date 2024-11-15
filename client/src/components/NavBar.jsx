import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <div className='flex border py-3 px-10 w-full' >
                <div className='flex w-1/2 justify-start items-center' >
                    <p>Task Manager</p>
                </div>
                <div className='flex w-1/2 justify-end items-center'  >
                    {token ? <>
                        <p onClick={handleLogout} className='bg-red-600 text-white py-1.5 cursor-pointer hover:bg-red-700 px-3 rounded-md text-sm' >Logout</p></> : <>
                        <p onClick={()=>navigate('/login')} className='text-sm mr-4 cursor-pointer' >Login</p>
                        <p onClick={()=>navigate('/register')} className='bg-blue-600 text-white py-1.5 cursor-pointer hover:bg-blue-700 px-3 rounded-md text-sm' >Signup</p></>}
                </div>

            </div>
        </div>
    )
}

export default NavBar