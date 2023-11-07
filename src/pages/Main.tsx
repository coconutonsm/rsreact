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
  const [, setSearchParams] = useSearchParams();

  const getSearchText = (searchText: string) => {
    setInputValue(searchText);
  };

  useEffect(() => {
    let url = API_URL + `?per_page=${perPage}&page=${currentPage}`;

    if (inputValue) {
      url = inputValue ? API_URL + `?beer_name=${inputValue}` : API_URL;
    }

    getCards(url, setCards, setIsLoading);
    setIsLoading(true);
    setSearchParams({ page: String(currentPage) });
  }, [inputValue, perPage, currentPage, setSearchParams]);

  return (
    <>
      <Header getSearchText={getSearchText} setCurrentPage={setCurrentPage} />
      <main>
        <LimitCards setPerPage={setPerPage} setCurrentPage={setCurrentPage} />
        {!isLoading ? (
          <>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={Math.ceil(
                (inputValue ? cards.length : ALL_BEER) / perPage
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
