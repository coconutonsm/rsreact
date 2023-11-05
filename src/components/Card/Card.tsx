import './card.scss';

type props = {
  name: string;
  image: string;
};

const Card: React.FC<props> = ({ name, image }) => {
  return (
    <div className="card">
      <img className="card__img" src={image} alt={name} />
      <p className="card__name">{name}</p>
    </div>
  );
};

export default Card;
