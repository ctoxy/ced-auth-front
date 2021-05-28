import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';
const Layout = ({ children, match, history }) => {
  /* permet de determiner le lien actif */
  const isActive = path => {
    if (match.path === path) {
      return { color: '#000' };
    } else {
      return { color: '#fff' };
    }
  };

  const nav = () => (

    <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" >Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={isActive('/')}>
                Home
                  </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/customers" style={isActive('/customers')}>
                CustomerList
              </Link>
            </li>
            {!isAuth() && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={isActive('/signup')}>SignUp</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin" style={isActive('/signin')}>Signin</Link>
                </li>

              </Fragment>

            )}

            {isAuth() && isAuth().role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" style={isActive('/admin')} to="/admin">
                  {isAuth().name}
                </Link>
              </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
              <li className="nav-item">
                <Link className="nav-link" style={isActive('/private')} to="/private">
                  {isAuth().name}
                </Link>
              </li>
            )}

            {isAuth() && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ cursor: 'pointer', color: '#fff' }}
                  onClick={() => {
                    signout(() => {
                      history.push('/');
                    });
                  }}
                >
                  Signout
                      </span>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>

  );

  return (
    <Fragment>
      {nav()}
      <div className="container p-5 text-center">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
