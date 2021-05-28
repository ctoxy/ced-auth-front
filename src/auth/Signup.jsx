import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: 'Cedric',
        email: 'cedric.bouve@gmail.com',
        password: '123456',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    // eslint-disable-next-line no-shadow
    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        //evite le rechargement intemptestif de la page sur chaque appui de bouton
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signupForm = () => (
        <form>
            <div class="form-group">
                <lable class="text-muted">Name</lable>
                <input onChange={handleChange('name')} value={name} type="text" class="form-control" />
            </div>

            <div class="form-group">
                <lable class="text-muted">Email</lable>
                <input onChange={handleChange('email')} value={email} type="email" class="form-control" />
            </div>

            <div class="form-group">
                <lable class="text-muted">Password</lable>
                <input onChange={handleChange('password')} value={password} type="password" class="form-control" />
            </div>

            <div>
                <button class="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div class="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 class="p-5 text-center">Signup</h1>
                {signupForm()}

                <br />

                <Link to="/auth/password/forgot" class="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>

            </div>
        </Layout>
    );
};

export default Signup;