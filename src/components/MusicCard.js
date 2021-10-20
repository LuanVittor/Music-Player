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

  async getFavorites() {
    const { trackName, favorites } = this.props;
    if (favorites.some((element) => element.trackName === trackName)) {
      this.setState({ checked: true });
    }
  }

  async favoritar({ target: { name, checked } }) {
    this.setState({ loading: true });
    const result = await getMusics(name);
    if (checked) {
      await addSong(result);
    } else {
      await removeSong(result);
    }
    this.setState({ loading: false });
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
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name={ trackId }
            onChange={ this.favoritar }
            checked={ checked }
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
};

export default MusicCard;
