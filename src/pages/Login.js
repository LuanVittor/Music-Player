import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.buttonEnable = this.buttonEnable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
    this.state = {
      inputLogin: '',
      button: true,
      redirect: false,
      loading: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.buttonEnable);
  }

  async click(user) {
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ loading: false, redirect: true });
  }

  buttonEnable() {
    const { inputLogin } = this.state;
    const minNum = 3;
    if (inputLogin.length >= minNum) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  render() {
    const { inputLogin, button, redirect, loading } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <input
            type="text"
            name="inputLogin"
            value={ inputLogin }
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ button }
            data-testid="login-submit-button"
            onClick={ () => this.click({ name: inputLogin }) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
