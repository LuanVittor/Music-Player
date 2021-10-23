import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.favoritar = this.favoritar.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    const { trackName, favorites } = this.props;
    if (favorites.some((element) => element.trackName === trackName)) {
      this.setState({ checked: true });
    }
  }

  async favoritar({ target: { name } }) {
    const { checked } = this.state;
    if (checked) {
      this.setState({ checked: false, loading: true });
      const result = await getMusics(name);
      await removeSong(result[0]);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true, checked: true });
      const result = await getMusics(name);
      await addSong(result[0]);
      this.setState({ loading: false });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ this.favoritar }
          />
        </label>
        {(loading) && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
