import React, { ChangeEvent } from 'react';
import './header.scss';

type props = {
  getSearchText: (x: string) => void;
};

type state = {
  inputValue: string;
  hasError: boolean;
};

class Header extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      inputValue: localStorage.getItem('searchText')?.length
        ? String(localStorage.getItem('searchText'))
        : '',
      hasError: false,
    };
  }

  handleSubmit = () => {
    this.props.getSearchText(this.state.inputValue);
    localStorage.setItem('searchText', this.state.inputValue);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value.trim() });
  };

  handleErrorSubmit = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw Error('Error!!');
    }

    return (
      <header className="header">
        <div className="search">
          <input
            type="text"
            className="searcInput"
            onChange={this.handleChange}
            value={this.state.inputValue}
            placeholder="Enter character name"
          />
          <button className="button" onClick={this.handleSubmit}>
            Search
          </button>
          <button className="button" onClick={this.handleErrorSubmit}>
            Throw Error
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
