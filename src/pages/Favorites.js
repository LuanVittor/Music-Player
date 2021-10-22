import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  async getFavorite() {
    const result = await getFavoriteSongs();
    // console.log(result);
    this.setState({ favorites: result });
  }

  render() {
    this.getFavorite();
    const { favorites } = this.state;
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
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
