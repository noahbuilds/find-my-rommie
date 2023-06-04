import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
    const baseUrl = `https://room-my-rommie-service.onrender.com/api/v1/user/signup`;
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });
    const [formData, updateFormData] = React.useState(initialFormData);
    const [processingSignUp, setProcessingSignUp] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(formData);

        // ... submit to API or something
        doSignUp(formData);
    };

    const doSignUp = async (formData: any) => {
        setProcessingSignUp(true);
        try {
            const response = await axios.post(baseUrl, formData);
            // console.log(response);
            if (response.status === 201) {
                // localStorage
                localStorage.setItem('token', response.data);
                // console.log(response.data)
                navigate('/login');
            } else {
                // navigate('/login');
            }
            setProcessingSignUp(false);
        } catch (error: any) {
            toast(error.response.data.msg);
            console.log(error);
            setProcessingSignUp(false);
        }
    };

    return (
        <>
            <img
                src="/assets/background.jpg"
                className="img splash"
                alt="main background image"
            />
            <section id="formFloat">
                <div id="formClose">
                    {/* <i
                    className="fa fa-times float-end"
                    // onClick={closeLoginForm}
                ></i> */}
                </div>
                <div id="signupForm">
                    <p className="w-100 h3 mb-2 text-center">Sign Up</p>
                    <label className="w-100">
                        <span className="sr-only">
                            Veritas Email Address (@veritas.edu.ng)
                        </span>
                        <input
                            className="form-control mb-3"
                            type="email"
                            name="email"
                            placeholder="Veritas Email Address (@veritas.edu.ng)"
                            onChange={handleChange}
                        />
                    </label>
                    <label className="w-100">
                        <span className="sr-only">FirstName</span>
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            onChange={handleChange}
                        />
                    </label>
                    <label className="w-100">
                        <span className="sr-only">LastName</span>
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            onChange={handleChange}
                        />
                    </label>
                    <label className="w-100">
                        <span className="sr-only">Password</span>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </label>

                    <button
                        className="mt-2 w-100 btn btn-success"
                        onClick={handleSubmit}
                        disabled={processingSignUp}
                    >
                        {processingSignUp ? 'Processing' : 'Signup!'}
                    </button>
                    <p className="text-center my-1">
                        Already have an account?
                        <a className="link" href="/login" id="showloginLink">
                            Sign in instead
                        </a>
                    </p>
                    {/* <p className="text-center my-1">
                        Forgot your password?{' '}
                        <a className="link" href="#" id="sendResetEmail">
                            Send a reset email
                        </a>
                    </p> */}
                    <p className="text-center my-3">
                        <span id="loginMsg"></span>
                    </p>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default SignUpPage;
