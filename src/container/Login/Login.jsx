import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { Navbar } from '../../components';
import { useAuth } from '../../contexts/authContext'
import './Login.css'

const Login = () => {
    const { userLoggedIn } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('Log In');
    

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                setMessage('LoggedIn')
                // Handle successful sign in, e.g., redirect to another page or show a success message
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
                // Handle successful Google sign in
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div>
        {userLoggedIn && (<Navigate to={'/'} replace={true}  /> )}
        {userLoggedIn && ( <Navbar Message={message}/> )}
            <main className="">
                <div className="">
                    <div className="">
                        <div className="">
                            <h3 className="headtext__cormorant">Welcome Back</h3>
                        </div>
                    </div>

                    
                    <form onSubmit={onSubmit} className="app__login-form">
                        <div className="app__login-form">
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="app__login-form_input"
                                placeholder='Enter Your Email'
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="app__login-form_input"
                                placeholder='Enter Password'
                            />
                        </div>
                        <div className='red'>
                        {errorMessage && (
                            <span className="p__opensans red">{errorMessage}</span>
                        )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`app__login-form_button custom__button ${isSigningIn ? 'app__login-form_button' : ''}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="sign_up"  >
                        Don't have an account? Sign up
                    </p>
                      
                        <div className=""></div>
                        <div className="sign_up_Or">OR</div>
                        <div className=""></div>
                    
                      <button
                          disabled={isSigningIn}
                          onClick={onGoogleSignIn}
                          className={` ${isSigningIn ? 'continiue_With-google' : 'continiue_With-google'}`}
                      >
                          {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                      </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
