import React from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="login">
      <div className="container">
        <form className="form">
          <fieldset className="form__fieldset">
            <legend className="form__legend">
              <h2 className="form__title">Вход</h2>
            </legend>
          </fieldset>

          <label className="form__group">
            <input type="email" name="email" placeholder="Email"
                   className="form__input form__input_theme_dark form__input_name_email"/>
            <span className="form__error-message form__error-message_field_name"></span>
          </label>

          <label className="form__group">
            <input type="password" name="password" placeholder="Пароль"
                   className="form__input form__input_theme_dark form__input_name_password"/>
            <span className="form__error-message form__error-message_field_name"></span>
          </label>

          <div className="login__bottom">
            <button type="submit" className="button button_theme_dark form__button">Войти</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
