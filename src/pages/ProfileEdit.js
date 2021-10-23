import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.click = this.click.bind(this);

    this.state = {
      buttonDisable: true,
      name: '',
      description: '',
      image: '',
      email: '',
      redirect: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  handler({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { name: name2, description, image, email } = this.state;
      if (name2 && description && image && email) {
        this.setState({ buttonDisable: false });
      }
    });
  }

  async getInfo() {
    const { name, email, image, description } = await getUser();
    this.setState({ loading: false, name, email, image, description }, () => {
      if (name && email && image && description) {
        this.setState({ buttonDisable: false });
      }
    });
  }

  click() {
    const { name, email, image, description } = this.state;
    const profileEdited = {
      name,
      email,
      image,
      description,
    };
    this.setState({ loading: true });
    updateUser(profileEdited);
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { loading, name, email, image,
      description, buttonDisable, redirect } = this.state;
    if (redirect) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {(loading) && <Loading />}
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="edit-input-name"
              type="text"
              value={ name }
              name="name"
              onChange={ this.handler }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              data-testid="edit-input-email"
              type="email"
              value={ email }
              name="email"
              onChange={ this.handler }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="edit-input-description"
              type="text"
              value={ description }
              name="description"
              onChange={ this.handler }
            />
          </label>
          <label htmlFor="image">
            Imagem
            <input
              data-testid="edit-input-image"
              type="text"
              value={ image }
              name="image"
              onChange={ this.handler }
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ buttonDisable }
            onClick={ this.click }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
