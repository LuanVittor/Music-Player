import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.buttonEnable = this.buttonEnable.bind(this);
    this.click2 = this.click2.bind(this);

    this.state = {
      inputValue: '',
      isButtonDisable: true,
      loading: false,
      response: '',
      notFound: false,
    };
  }

  onHandleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.buttonEnable);
  }

  async click2() {
    const { inputValue } = this.state;
    this.setState({ artista: inputValue, inputValue: '', loading: true });
    const result = await searchAlbumsAPI(inputValue);
    if (result.length) {
      this.setState({ loading: false, response: result });
    } else {
      this.setState({ loading: false, notFound: true, artista: false });
    }
  }

  buttonEnable() {
    const { inputValue } = this.state;
    if (inputValue.length >= 2) {
      this.setState({ isButtonDisable: false });
    } else {
      this.setState({ isButtonDisable: true });
    }
  }

  render() {
    const { inputValue, isButtonDisable, loading,
      response, artista, notFound } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="inputValue"
            value={ inputValue }
            onChange={ this.onHandleChange }
          />
          <button
            type="button"
            disabled={ isButtonDisable }
            data-testid="search-artist-button"
            onClick={ this.click2 }
          >
            Pesquisar
          </button>
        </form>
        <div>
          {(artista) && <h2>{`Resultado de álbuns de: ${artista}`}</h2>}
          {(response) && response
            .map(({ collectionId, collectionName, artistName, artworkUrl100 }) => (
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
                key={ collectionId }
              >
                <img src={ artworkUrl100 } alt="albumImage" />
                <h4>{artistName}</h4>
                <h2>{collectionName}</h2>
              </Link>
            ))}
          {(notFound) && <h2>Nenhum álbum foi encontrado</h2>}
        </div>
      </div>
    );
  }
}

export default Search;
