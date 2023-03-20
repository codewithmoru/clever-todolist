import React, { useState, useEffect } from 'react';
import './signpage.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../components/Loader';

import { auth } from '../sources/firebase';
import Button from '../components/Button';
import AlertMessage from '../components/AlertMessage';

function SignPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage');
      }
    });
  }, [navigate]);

  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onReset = () => {
    setPassword('');
    setEmail('');
    setError(false);
  };
  const handleSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/homepage');
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false)
      });
  };
  const onShowPswrd = () => {
    const x = document.querySelector('.sign-input-password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  return (
    <div className='sign-page'>
      <div className='sign-header'>
        <div className='sign-header-elem'>
          <h3>LOGIN</h3>
        </div>
        <div className='sign-header-elem'>
          <Link to='/registration'>
            <h3>SIGNUP</h3>
          </Link>
        </div>
      </div>
      {loading ? <Loader /> : <div className='sign-content'>
        <h1>Welcome Back</h1>
        <h3>Hello Again! Sign up to continue!</h3>
        <input
          className='sign-input-email'
          type='email'
          placeholder='person@gmail.com'
          value={email}
          onChange={onchangeEmail}
        ></input>
        <input
          className='sign-input-password'
          type='password'
          placeholder='******'
          value={password}
          onChange={onchangePassword}
        ></input>
        <div style={{ display: 'flex', gap: '5px' }}>
          <input type='checkbox' onClick={onShowPswrd} />
          <p>Show Password</p>
        </div>
        <Button onClick={handleSignIn} title={'SIGN IN'} />
        <AlertMessage error={error} setError={setError} />
        <h6 className='sign-text-reset' onClick={onReset}>
          RESET PASSWORD
        </h6>
      </div>}
    </div>
  );
}

export default SignPage;
