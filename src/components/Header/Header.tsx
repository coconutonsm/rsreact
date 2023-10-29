import React, { ChangeEvent } from 'react';
import './header.scss';

interface props {
  getSerchText: (x: string) => void;
}

interface state {
  inputValue: string;
}

class Header extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  handleSubmit = () => {
    this.props.getSerchText(this.state.inputValue);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <header>
        <div className="search">
          <input
            type="text"
            className="searcInput"
            onChange={this.handleChange}
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
