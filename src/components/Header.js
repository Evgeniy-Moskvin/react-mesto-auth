import React from 'react';
import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="header container">
      <a href="#" className="logo">
        <img src={logo} alt="Логотип сервиса Mesto" className="logo__image"/>
      </a>
    </header>
  );
};

export default Header;
