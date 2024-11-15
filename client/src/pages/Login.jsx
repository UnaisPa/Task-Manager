

// export default Login

import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../axios";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import app from "../firebase";
export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        if (formDatas.email.trim() == "") {
            formErrors.email = "Enter your email";
        }
        if (formDatas.password.trim() == "") {
            formErrors.password = "Enter your Password";
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
                axios.post('api/users/login', formData).then((response) => {
                    if (response.data.status) {
                        toast.success(response.data.message);
                        localStorage.setItem('token', response.data.token);
                        navigate('/')
                    } else {

                        toast.warning(response.data.message);
                    }
                }).catch((err) => {
                    console.log(err)
                    toast.error(err.response.data.message ? err.response.data.message : 'Login failed!')
                })

                // Handle the successful response
                // console.log(response.data);

                //alert('User created successfully');
            } catch (err) {
                // Handle error during the API request
                console.error(err);
                toast.error('Login failed');
            } finally {
                setLoading(false); // Set loading state to false after the request completes
            }
        }
    };

    const handleGoogleBtn = async (e) => {
        e.preventDefault();
        try {
            //dispatch(signInStart());
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const response = await axios.post(
                "api/users/google_auth",
                {
                    name: result.user.displayName,
                    email: result.user.email,
                },
                { withCredentials: true }
            );
            console.log(response.data);
            setTimeout(() => {
                toast.success("Login Success");
                //console.log(response.data)
                
                localStorage.setItem("jwt", response.data.token);
                navigate("/");
            }, 1000);
        } catch (err) {
            console.log(err.response ? err.response.data : err.message);
            toast.error(err.response.data.message?err.response.data.message:'Google authentication failed');
            // toast.error(err.message);
        }
    };

    return (
        <>
            <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmitHandler} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className={` ${errors.email ? 'text-red-400' : 'text-gray-900'} block text-sm/6 font-medium `}>
                                {errors.email ? errors.email : "Email address"}
                            </label>
                            <div className="mt-2">
                                <input onChange={onChangeHandler}
                                    id="email"
                                    name="email"
                                    type="email"

                                    autoComplete="email"
                                    placeholder="abc@gmail.com"
                                    className={` ${errors.email == 'error' ? 'ring-red-500' : 'ring-gray-300'} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm/6`}

                                // className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className={` ${errors.password ? 'text-red-400' : 'text-gray-900'} block text-sm/6 font-medium `}>
                                    {errors.password ? errors.password : "Password"}
                                </label>

                            </div>
                            <div className="mt-2">
                                <input onChange={onChangeHandler}
                                    id="password"
                                    name="password"
                                    type="password"

                                    autoComplete="current-password"
                                    placeholder="Your Password"
                                    className={` ${errors.password == 'error' ? 'ring-red-500' : 'ring-gray-300'} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm/6`}

                                // className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button disabled={loading}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? 'Submitting...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account?{' '}
                        <span onClick={() => navigate('/register')} className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </span>
                    </p>

                    <div className=" flex justify-center items-center mt-6" >
                        <button onClick={handleGoogleBtn} className=" py-2 px-6 bg-blue-100 hover:bg-blue-200 flex items-center text-sm rounded-lg" >
                            <FcGoogle size={20} className="mr-4" /> Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}