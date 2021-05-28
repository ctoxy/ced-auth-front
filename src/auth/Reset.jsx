import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
    // props.match from react router dom
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        // console.log(name);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, [match.params.token, values]);

    const { name, token, newPassword, buttonText } = values;

    const handleChange = event => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Done' });
            })
            .catch(error => {
                console.log('RESET PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Reset password' });
            });
    };

    const passwordResetForm = () => (
        <form>
            <div class="form-group">
                <label class="text-muted">Email</label>
                <input
                    onChange={handleChange}
                    value={newPassword}
                    type="password"
                    class="form-control"
                    placeholder="Type new password"
                    required
                />
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
                <h1 class="p-5 text-center">Hey {name}, Type your new password</h1>
                {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default Reset;
