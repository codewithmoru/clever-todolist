import React from 'react';
import '../pages/homepage.css';

function HomepageHeader({ activeUser, handleSignOut }) {
  return (
    <div className='homepage-header'>
      <div>
        <h2>INNOWISE CLEVER-TODO-LIST TASK </h2>
        <h3>It's Time To Work , { activeUser } </h3>
      </div>
      <button className='homepage-header-btn' onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default HomepageHeader;
