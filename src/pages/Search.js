import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.buttonEnable = this.buttonEnable.bind(this);
    this.state = {
      inputValue: '',
      isButtonDisable: true,
    };
  }

  onHandleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.buttonEnable);
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
    const { inputValue, isButtonDisable } = this.state;
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
