

// export default Login
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "../axios";
export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validate = (formDatas) => {
        const formErrors = {};
        if (formDatas.firstName.trim() == "") {
            formErrors.firstName = "error";
        }
        if (formDatas.lastName.trim() == "") {
            formErrors.lastName = "error";
        }

        if (formDatas.email.trim() == "") {
            formErrors.email = "error";
        }

        if (formDatas.password.trim() == "") {
            formErrors.password = "error";
        }

        if (formDatas.confirmPassword.trim() == "") {
            formErrors.confirmPassword = "error";
        }

        if(formDatas.password !== formDatas.confirmPassword){
            formErrors.password = "error";
            formErrors.confirmPassword = "error";
        }
        setErrors(formErrors);
        return formErrors;
    };

    // Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length == 0) {

            try {
                setLoading(true); // Set loading state to true

                // Make the API request to save the user
                axios.post('api/users/register', formData).then((response) => {
                    if (response.data.status) {
                        toast.success('User Registration successfull!, please Login');
                        navigate('/login')
                    }else{
                        toast.warning(response.data.message);
                    }
                }).catch((err) => {
                    console.log(err)
                    toast.error(err.response.data.message? err.response.data.message:'User registration failed!')
                })

                // Handle the successful response
                // console.log(response.data);

                //alert('User created successfully');
            } catch (err) {
                // Handle error during the API request
                console.error(err);
                toast.error('User registration failed');
            } finally {
                setLoading(false); // Set loading state to false after the request completes
            }
        }
    };
    return (
        <>
            <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmitHandler} method="POST" className="space-y-4">
                        <div>

                            <div className="mt-2">
                                <input onChange={onChangeHandler}
                                    id="firstName"
                                    name="firstName"
                                    type="firstName"
                                    autoComplete="firstName"
                                    placeholder="First Name"
                                    className={` ${errors.firstName == 'error' ? 'ring-red-500' : 'ring-gray-300'} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm/6`}
                                />
                            </div>
                        </div>
                        <div>

                            <div className="mt-1">
                                <input onChange={onChangeHandler}
                                    id="lastName"
                                    name="lastName"
                                    type="lastName"
                                    autoComplete="lastName"
                                    placeholder="Last Name"
                                    className={` ${errors.lastName == 'error' ? 'ring-red-500' : 'ring-gray-300'} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm/6`}

                                    // className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>

                            <div className="mt-1">
                                <input onChange={onChangeHandler}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                    className={` ${errors.email == 'error' ? 'ring-red-500' : 'ring-gray-300'} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm/6`}

                                    // className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>

                            <div className="mt-1">
                                <input onChange={onChangeHandler}
                                    id="password"
                                    name="password"
                                    type="password"
                                    // required
                                    autoComplete="email"
                                    placeholder="Password"
                                    className={` ${errors.password == 'error' ? 'ring-red-500' : 'ring-gray-300'} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm/6`}

                                    // className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>



                        <div>

                            <div className="mt-1">
                                <input onChange={onChangeHandler}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    
                                    autoComplete="confirmPassword"
                                    placeholder="Confirm Password"
                                    className={` ${errors.confirmPassword == 'error' ? 'ring-red-500' : 'ring-gray-300'} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm/6`}

                                    // className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button disabled={loading}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? 'Submitting...' : 'Sign Up'}
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