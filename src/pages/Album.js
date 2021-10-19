import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.musicId = this.musicId.bind(this);
    this.state = {
      loading: true,
      result: {
        artistName: '',
        collectionName: '',
      },
      track: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.musicId(id);
  }

  async musicId(id) {
    const results = await getMusics(id);
    console.log(results);
    console.log(results.slice(1));
    const collection = results[0];
    this.setState({ loading: false, result: collection, track: results.slice(1) });
  }

  render() {
    const { loading, result, track } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        {(loading) ? <Loading /> : (
          <div>
            <h2 data-testid="album-name">{ result.collectionName }</h2>
            <h4 data-testid="artist-name">{ result.artistName }</h4>
            {track.map(({ trackName, previewUrl }) => (
              <MusicCard
                trackName={ trackName }
                previewUrl={ previewUrl }
                key={ trackName }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
