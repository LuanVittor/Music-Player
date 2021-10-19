import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.user();
  }

  async user() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component">
        <BrowserRouter>
          <Link to="/">Login</Link>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/album">Album</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <Link to="/profile/edit">ProfileEdit</Link>
        </BrowserRouter>
        <p data-testid="header-user-name">{user.name}</p>
      </header>
    );
  }
}

export default Header;
