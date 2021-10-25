import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.getFavorite = this.getFavorite.bind(this);
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  async getFavorite() {
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({ favorites: result, loading: false });
    console.log(result);
  }

  render() {
    // this.getFavorite();
    const { favorites, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favoritos</h1>
        {(favorites) && favorites.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <MusicCard
              favorites={ favorites }
              trackName={ trackName }
              previewUrl={ previewUrl }
              key={ trackName }
              trackId={ trackId }
              getFavorite={ this.getFavorite }
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
