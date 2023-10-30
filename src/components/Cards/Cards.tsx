import React from 'react';
import './cards.scss';

type props = {
  children: React.ReactNode;
};

type state = Record<string, never>;

class Cards extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }
  render() {
    return <div className="cards">{this.props.children}</div>;
  }
}

export default Cards;
