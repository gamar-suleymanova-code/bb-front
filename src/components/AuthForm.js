import React from "react";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from "formik";
import * as Yup from 'yup';
import FormField from './FormField';
import { useDispatch } from "react-redux";
import { seUserAuthorized } from "../features/mainSlice";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ isLogin }) { // isLogin defines if it's a login form or register
    const dispath = useDispatch();
    const navigate = useNavigate();
    const initialValues = isLogin
        ? { email: '', password: '' }
        : { fullName: '', email: '', password: '', confirmPassword: '' };

    const validationSchema = Yup.object(
        isLogin
            ? {
                email: Yup.string()
                    .email('Enter a valid email')
                    .required('Email is required'),
                password: Yup.string()
                    .required('Password is required'),
            }
            : {
                fullName: Yup.string()
                    .required('Full name is required'),
                email: Yup.string()
                    .email('Enter a valid email')
                    .required('Email is required'),
                password: Yup.string()
                    .min(8, 'Password must be at least 8 characters long')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm your password'),
            }
    );
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log(values);
            dispath(seUserAuthorized(true));
            if(isLogin) {
                // navigate to dashboard
                navigate('/BudgetBuddy/dashboard');
            } else {
                // navigate to newUser page
                navigate('/BudgetBuddy/greeting');
            }
        }
    });
   
    return (
        <form className={`${isLogin ? 'login_form' : 'register_form'} d-flex flex-column gap_24px`}
            onSubmit={formik.handleSubmit}>
            <div className='input_group d-flex flex-column gap_18px'>
                {!isLogin && <FormField name='fullName' type='text' placeholder='Full Name' autoComplete='name' formik={formik}></FormField>}
                <FormField name='email' type='text' placeholder='Email' autoComplete={'email'} formik={formik}></FormField>
                <FormField name='password' type='password' placeholder='Password' autoComplete={isLogin ? 'current-password' : 'new-password'}formik={formik}></FormField>
                {!isLogin && <FormField name='confirmPassword' type='password' placeholder='Confirm Password' autoComplete='new-password' formik={formik}></FormField>}
            </div>
            <button
                type='submit'
                className='default_btn shadow_on_state bg_main c_light rounded_12px w-100 h6 flex_center gap_12px transition_default'
            >
                {`${isLogin ? 'Login' : 'Register'}`}
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
        </form>
    );
}