import React from 'react'

const NavBar = () => {
    return (
        <div>
            <div className='flex border py-3 px-10 w-full' >
                <div className='flex w-1/2 justify-start items-center' >
                    <p>Task Manager</p>
                </div>
                <div className='flex w-1/2 justify-end items-center'  >
                    <p className='text-sm mr-4 cursor-pointer' >Login</p>
                    <p className='bg-blue-600 text-white py-1.5 cursor-pointer hover:bg-blue-700 px-3 rounded-md text-sm' >Signup</p>
                </div>

            </div>
        </div>
    )
}

export default NavBar