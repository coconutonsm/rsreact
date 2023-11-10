import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Cards from '../components/Cards/Cards';
import Card from '../components/Card/Card';
import Preloader from '../components/Preloader/Preloader';
import Pagination from '../components/Pagination/Pagination';
import LimitCards from '../components/LimitCards/LimitCards';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getCards } from '../services/getData';
import { ALL_BEER, API_URL } from '../consts';

const App = () => {
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('searchText') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cards, setCards] = useState<resultItem[]>([]);
  const [countCardsSearch, setCountCardsSearch] = useState<number>();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const url =
      API_URL +
      `?per_page=${perPage}&page=${currentPage}${
        inputValue ? `&beer_name=${inputValue}` : ``
      }`;

    getCards(url, setCards, setIsLoading);
    setIsLoading(true);
    setSearchParams({ page: String(currentPage) });
  }, [inputValue, perPage, currentPage, setSearchParams]);

  return (
    <>
      <Header
        setInputValue={setInputValue}
        setCurrentPage={setCurrentPage}
        setCountCardsSearch={setCountCardsSearch}
      />
      <main>
        <LimitCards setPerPage={setPerPage} setCurrentPage={setCurrentPage} />
        {!isLoading ? (
          <>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={Math.ceil(
                (inputValue
                  ? countCardsSearch
                    ? countCardsSearch
                    : 0
                  : ALL_BEER) / perPage
              )}
            />
            <div className="cards_wrapper">
              <Cards>
                {cards.length &&
                  cards.map((item) => (
                    <Card
                      key={item.id}
                      name={item.name}
                      image={item.image_url}
                      id={item.id}
                    />
                  ))}
              </Cards>
              <Outlet />
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </main>
    </>
  );
};

export default App;
