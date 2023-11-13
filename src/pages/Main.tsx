import { useEffect, useReducer, useState } from 'react';
import Header from '../components/Header/Header';
import Cards from '../components/Cards/Cards';
import Card from '../components/Card/Card';
import Preloader from '../components/Preloader/Preloader';
import Pagination from '../components/Pagination/Pagination';
import LimitCards from '../components/LimitCards/LimitCards';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getCards } from '../services/getData';
import { ALL_BEER, API_URL } from '../consts';
import {
  SearchReducer,
  initialState,
  SearchContext,
} from '../contexts/context';
import { REDUCE_ACTION_TYPE } from '../types/types';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countCardsSearch, setCountCardsSearch] = useState<number>();
  const [, setSearchParams] = useSearchParams();

  const [{ search, cards }, dispatch] = useReducer(SearchReducer, initialState);

  const setCards = async (url: string) => {
    setIsLoading(true);
    const cataCards = await getCards(url);
    dispatch({
      type: REDUCE_ACTION_TYPE.CARDS_DATA,
      payload: cataCards as resultItem[],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const url =
      API_URL +
      `?per_page=${perPage}&page=${currentPage}${
        search ? `&beer_name=${search}` : ``
      }`;
    setCards(url);
    setSearchParams({ page: String(currentPage) });
  }, [search, perPage, currentPage, setSearchParams]);

  return (
    <>
      <SearchContext.Provider value={{ search, cards, dispatch }}>
        <Header
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
                  (search
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
      </SearchContext.Provider>
    </>
  );
};

export default App;
