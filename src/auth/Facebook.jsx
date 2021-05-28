import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const Facebook = ({ informParent = f => f }) => {
    const responseFacebook = response => {
        // console.log(response);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { userID: response.userID, accessToken: response.accessToken }
        })
            // eslint-disable-next-line no-shadow
            .then(response => {
                console.log('FACEBOOK SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
            });
    };
    return (
        <div class="pb-3">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} class="btn btn-primary btn-lg btn-block">
                        <i class="fab fa-facebook pr-2" /> Login with Facebook
                    </button>
                )}
            />
        </div>
    );
};

export default Facebook;