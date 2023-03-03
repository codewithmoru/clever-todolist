import React from 'react';
import '.././App.css';

function Button({ onClick, title }) {
  return <input className='sign-reg-btn' type='button' value={title} onClick={onClick}></input>;
}

export default Button;
