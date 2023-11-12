import { useNavigate, useParams } from 'react-router-dom';
import './singleCard.scss';
import { useEffect, useState } from 'react';
import { API_URL } from '../../consts';
import { getCards } from '../../services/getData';
import Preloader from '../Preloader/Preloader';

const SingleCard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [card, setCard] = useState<resultItem[]>([]);

  const getSingleCard = async () => {
    setIsLoading(true);
    const card = await getCards(`${API_URL}/${id}`);
    setCard(card as resultItem[]);
    setIsLoading(false);
  };

  useEffect(() => {
    getSingleCard();
  }, [id]);

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      {!isLoading ? (
        <div className="single_card">
          {card.length && (
            <>
              <button onClick={handleClick}>close</button>
              <div className="single_card__wrapper">
                <p className="single_card__name">{card[0].name}</p>
                <img
                  className="single_card__img"
                  src={card[0].image_url}
                  alt={card[0].name}
                />
              </div>
              <p className="single_card__name">{card[0].description}</p>
            </>
          )}
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default SingleCard;
