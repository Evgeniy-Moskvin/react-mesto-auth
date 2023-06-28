import React from 'react';
import logo from '../images/logo.svg';

const Header = ({ loggedIn, userData }) => {
  return (
    <header className="header container">
      <a href="#" className="logo">
        <img src={logo} alt="Логотип сервиса Mesto" className="logo__image"/>
      </a>

      <nav className="user-navigate">
        <ul className="user-navigate__list">
          {!loggedIn && (
            <li className="user-navigate__item">
              <a href="#" className="user-navigate__link opacity-effect">Войти</a>
            </li>
          )}

          {loggedIn && (
            <>
              <li className="user-navigate__item">
                <a href={`mailto:${userData.email}`} className="user-navigate__link opacity-effect">{userData.email}</a>
              </li>

              <li className="user-navigate__item">
                <a href="#" className="user-navigate__link user-navigate__link_logout opacity-effect">Выйти</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
