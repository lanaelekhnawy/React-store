import React, { useState, useContext } from "react";
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import * as Yup from 'yup';
import bgImage from '../../assets/images/sumup-ogxCVsQzOGg-unsplash.jpg';
import styles from "./Register.module.css";


export default function Register() {
    let [apiError, setError] = useState('');
    let [isLoading, setLoading] = useState(false);
    let { setLogin } = useContext(userContext);
    let navigate = useNavigate();

    async function handleRegister(formData) {
        setLoading(true);
        setError('');
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formData)
            .then((response) => {
                setLoading(false);
                if (response.data.message === 'success') {
                    localStorage.setItem('userToken', response.data.token);
                    setLogin(response.data.token);
                    navigate('/');
                }
            })
            .catch((error) => {
                setLoading(false);
           
                setError(error.response?.data?.message || "Registration failed. Please try again.");
            });
    }

    let validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(20, 'Name must be less than 20 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format (example@domain.com)')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
            .required('Phone is required'),
        password: Yup.string()
            .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with capital letter and be 6-11 characters')
            .required('Password is required'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
            .required('Confirm password is required'),
    });

    let formik = useFormik({
        initialValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
        validationSchema,
        onSubmit: handleRegister
    });

    return (
         <section 
    className={styles.authPage} 
    style={{ backgroundImage: `url(${bgImage})` ,
                backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            // backgroundAttachment: 'fixed',
            maxHeight: '150vh',
           
          
        
            }} 
>
    <div className={styles.overlay}>
        <div className={styles.glassContainer}>
            <div className="text-center mb-4">
                <h1 className={styles.mainTitle}>Sign Up</h1>
                <p className={styles.subTitle}>Join our healthy shopping community</p>
            </div>

           
            {apiError && <div className="alert alert-danger py-2 small text-center">{apiError}</div>}

            <form onSubmit={formik.handleSubmit}>
                
               
                <div className={styles.inputGroup}>
                    <input name="name" type="text" placeholder="Full Name"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} 
                        className={formik.touched.name && formik.errors.name ? styles.errorBorder : ''} />
                    {formik.touched.name && formik.errors.name ? <p className={styles.errorMsg}>{formik.errors.name}</p> : null}
                </div>

                <div className={styles.inputGroup}>
                    <input name="email" type="email" placeholder="Email Address"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                        className={formik.touched.email && formik.errors.email ? styles.errorBorder : ''} />
                    {formik.touched.email && formik.errors.email ? <p className={styles.errorMsg}>{formik.errors.email}</p> : null}
                </div>

                <div className={styles.inputGroup}>
                    <input name="phone" type="tel" placeholder="Phone Number (e.g. 01xxxxxxxxx)"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
                        className={formik.touched.phone && formik.errors.phone ? styles.errorBorder : ''} />
                    {formik.touched.phone && formik.errors.phone ? <p className={styles.errorMsg}>{formik.errors.phone}</p> : null}
                </div>


                <div className={styles.inputGroup}>
                    <input name="password" type="password" placeholder="Password (Start with uppercase)"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                        className={formik.touched.password && formik.errors.password ? styles.errorBorder : ''} />
                    {formik.touched.password && formik.errors.password ? <p className={styles.errorMsg}>{formik.errors.password}</p> : null}
                </div>

                <div className={styles.inputGroup}>
                    <input name="rePassword" type="password" placeholder="Confirm Password"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}
                        className={formik.touched.rePassword && formik.errors.rePassword ? styles.errorBorder : ''} />
                    {formik.touched.rePassword && formik.errors.rePassword ? <p className={styles.errorMsg}>{formik.errors.rePassword}</p> : null}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Create Account"}
                </button>
            </form>

            <p className={styles.footerText}>
                Already have an account? <Link to="/Login">Login</Link>
            </p>
        </div>
    </div>
</section>
    );
}