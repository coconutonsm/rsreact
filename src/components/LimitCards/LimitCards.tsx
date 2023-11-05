import { ChangeEvent } from 'react';
import './limitCards.scss';

type props = {
  setPerPage: (x: number) => void;
  setCurrentPage: (x: number) => void;
};

const LimitCards: React.FC<props> = ({ setPerPage, setCurrentPage }) => {
  function chengeSelect(e: ChangeEvent<HTMLSelectElement>) {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="limit">
      <span>Limit imtes:</span>
      <select name="select" onChange={chengeSelect}>
        <option value="8">8</option>
        <option defaultValue="12">12</option>
        <option value="16">16</option>
      </select>
    </div>
  );
};

export default LimitCards;
