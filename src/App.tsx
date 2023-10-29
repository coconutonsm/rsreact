import './App.scss';
import React from 'react';
import Header from './components/Header/Header';

type props = Record<string, never>;

type state = {
  inputValue: string;
};

class App extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  getSerchText = (searchText: string) => {
    this.setState({ inputValue: searchText });
  };

  render() {
    return (
      <div>
        <Header getSerchText={this.getSerchText} />
        <div>{this.state.inputValue}</div>
      </div>
    );
  }
}

export default App;
