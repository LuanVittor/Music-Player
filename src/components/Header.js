import React from 'react';
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
        <p data-testid="header-user-name">{user.name}</p>
      </header>
    );
  }
}

export default Header;
