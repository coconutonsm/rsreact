import React from 'react';
import './cards.scss';

type props = {
  children: React.ReactNode;
};

const Cards: React.FC<props> = ({ children }) => {
  return <div className=" cards">{children}</div>;
};

export default Cards;
