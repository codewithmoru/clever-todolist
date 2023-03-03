import React, { useState } from 'react';
import './regpage.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../sources/firebase';
import Button from '../components/Button';
import AlertMessage from '../components/AlertMessage';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

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
  const handleCreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/homepage');
      })
      .catch((err) => setError(true));
  };

  const onShowPswrd = () => {
    const x = document.querySelector('.reg-input-password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  return (
    <div className='reg-page'>
      <div className='reg-header'>
        <div className='reg-header-elem'>
          <Link to='/'>
            <h3>LOGIN</h3>
          </Link>
        </div>
        <div className='reg-header-elem'>
          <h3>SIGNUP</h3>
        </div>
      </div>
      <div className='reg-content'>
        <h1>You're Welcome</h1>
        <h3>Register to continue!</h3>
        <input
          className='reg-input-email'
          type='email'
          placeholder='person@gmail.com'
          value={email}
          onChange={onchangeEmail}
        ></input>
        <input
          className='reg-input-password'
          type='password'
          placeholder='******'
          value={password}
          onChange={onchangePassword}
        ></input>
        <div style={{ display: 'flex', gap: '5px' }}>
          <input type='checkbox' onClick={onShowPswrd} />
          <p>Show Password</p>
        </div>
        <Button onClick={handleCreateUser} title={'SIGN UP'} />
        <AlertMessage error={error} setError={setError} />
        <h6 className='reg-text-reset' onClick={onReset}>
          RESET PASSWORD
        </h6>
      </div>
    </div>
  );
}

export default RegisterPage;
