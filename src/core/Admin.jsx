import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { role, name, email, password, buttonText } = values;

    // eslint-disable-next-line no-shadow
    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>
            <div class="form-group">
                <label class="text-muted">Role</label>
                <input defaultValue={role} type="text" class="form-control" disabled />
            </div>
            <div class="form-group">
                <label class="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" class="form-control" />
            </div>

            <div class="form-group">
                <label class="text-muted">Email</label>
                <input defaultValue={email} type="email" class="form-control" disabled />
            </div>

            <div class="form-group">
                <label class="text-muted">Password</label>
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
                <h1 class="pt-5 text-center">Admin</h1>
                <p class="lead text-center">Profile update</p>
                {updateForm()}
            </div>
        </Layout>
    );
};

export default Admin;