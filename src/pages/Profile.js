import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from '../components/Header';

class Profile extends React.Component {
  constructor() {
    super();
    this.gettingUser = this.gettingUser.bind(this);
    this.state = {
      loading: false,
      image: '',
      name: '',
      email: '',
      description: '',
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  async gettingUser() {
    this.setState({ loading: true });
    const { name, email, image, description } = await getUser();
    this.setState({ loading: false, name, email, image, description });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {(loading) ? <Loading /> : (
          <div>
            <h2>{ name }</h2>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <h3>{ email }</h3>
            <h3>{ description }</h3>
            <Link to="/profile/edit"><p>Editar perfil</p></Link>
          </div>
        ) }
      </div>
    );
  }
}

// https://images.vexels.com/media/users/3/140753/isolated/lists/07326bd6157c14c5f8316e52b6c9dae4-avatar-de-perfil-masculino-7.png

export default Profile;
