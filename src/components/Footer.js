import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className='footer'>
      <h3>
        Made with{' '}
        <span role='img' aria-label='heart'>
          ♥️
        </span>{' '}
        by: <a href='https://abhineet.me'>@abe312</a>
      </h3>
    </div>
  );
}

export default Footer;
