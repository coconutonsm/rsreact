import React from 'react';
import './card.scss';

type props = {
  name: string;
  image: string;
};

type state = Record<string, never>;

class Card extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }

  render() {
    const props = this.props;
    return (
      <div className="card">
        <img className="card__img" src={props.image} alt={props.name} />
        <p className="card__name">{props.name}</p>
      </div>
    );
  }
}

export default Card;
