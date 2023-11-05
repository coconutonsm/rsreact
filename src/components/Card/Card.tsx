import { NavLink } from 'react-router-dom';
import './card.scss';

type props = {
  name: string;
  image: string;
  id: number;
};

const Card: React.FC<props> = ({ name, image, id }) => {
  return (
    <div className="card">
      <NavLink to={`/card/${id}`}>
        <div className="card__wrapper">
          <img className="card__img" src={image} alt={name} />
        </div>
        <p className="card__name">{name}</p>
      </NavLink>
    </div>
  );
};

export default Card;
