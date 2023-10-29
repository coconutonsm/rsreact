import React, { ChangeEvent } from 'react';
import './header.scss';

type props = {
  getSearchText: (x: string) => void;
};

type state = {
  inputValue: string;
};

class Header extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      inputValue: localStorage.getItem('searchText')?.length
        ? String(localStorage.getItem('searchText'))
        : '',
    };
  }

  handleSubmit = () => {
    this.props.getSearchText(this.state.inputValue);
    localStorage.setItem('searchText', this.state.inputValue);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value.trim() });
  };

  render() {
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
        </div>
      </header>
    );
  }
}

export default Header;
