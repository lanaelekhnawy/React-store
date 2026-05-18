import React, { useState, useContext } from "react";
import { useFormik } from 'formik';
import { userContext } from "../../Context/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup';
import styles from "./Login.module.css";
import bgImage from '../../assets/Images/sumup-ogxCVsQzOGg-unsplash.jpg';
import { Link } from "react-router-dom";

export default function Login() {
    let [apiError, setError] = useState('');
    let [isLoading, setLoading] = useState(false);
    let { setLogin } = useContext(userContext);
    let navigate = useNavigate();

    async function handleLogin(formData) {
        setLoading(true);
        setError('');

        try {
           
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formData);

            if (data.message === 'success') {
                setLoading(false);

                localStorage.setItem('userToken', data.token);
                setLogin(data.token);
    
                navigate('/'); 
            }
        } catch (error) {
            setLoading(false);
            
            const errorMessage = error.response?.data?.message || "Check your internet connection and try again";
            setError(errorMessage);
            console.log('Login Error:', errorMessage);
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Enter a valid email'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^[A-Z][a-z0-9]{6,8}$/, 'Password must start with Uppercase and be 6-8 characters'),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin
    });

    return (
       
        <section className={styles.authPage} 
    style={{ backgroundImage: `url(${bgImage})` ,
                backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            maxHeight: '150vh',
           
          
        
            }} 
>
    <div className={styles.overlay}>
        <div className={styles.glassContainer}>
            <div className="text-center mb-4">
                <h1 className={styles.mainTitle}>Login</h1>
                <p className={styles.subTitle}>  Complet your healthy shopping </p>
            </div>

           
            {apiError && <div className="alert alert-danger py-2 small text-center">{apiError}</div>}

            <form onSubmit={formik.handleSubmit}>
                
             

                <div className={styles.inputGroup}>
                    <input name="email" type="email" placeholder="Email Address"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                        className={formik.touched.email && formik.errors.email ? styles.errorBorder : ''} />
                    {formik.touched.email && formik.errors.email ? <p className={styles.errorMsg}>{formik.errors.email}</p> : null}
                </div>


        
                <div className={styles.inputGroup}>
                    <input name="password" type="password" placeholder="Password (Start with uppercase)"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                        className={formik.touched.password && formik.errors.password ? styles.errorBorder : ''} />
                    {formik.touched.password && formik.errors.password ? <p className={styles.errorMsg}>{formik.errors.password}</p> : null}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
                </button>
            </form>


            
                        <p className={styles.footerText}>
                             Don't have account? Create One
                        <Link to="/Register">Register</Link>
                        </p>
        </div>
    </div>
</section>
    );
}