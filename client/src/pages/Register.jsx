

// export default Login

import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
export default function Register() {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-4">
                        <div>

                            <div className="mt-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="firstName"
                                    required
                                    autoComplete="firstName"
                                    placeholder="First Name"
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>

                            <div className="mt-1">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="lastName"
                                    required
                                    autoComplete="lastName"
                                    placeholder="Last Name"
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>

                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Email"
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>

                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="email"
                                    placeholder="Password"
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>



                        <div>

                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    autoComplete="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <span onClick={() => navigate('/login')} className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500">
                            Login
                        </span>
                    </p>

                    <div className=" flex justify-center items-center mt-6" >
                        <button className=" py-2 px-6 bg-blue-100 hover:bg-blue-200 flex items-center text-sm rounded-lg" >
                            <FcGoogle size={20} className="mr-4" /> Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}