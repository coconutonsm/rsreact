import './App.scss';
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import axios from 'axios';
import Cards from './components/Cards/Cards';
import Card from './components/Card/Card';
import Preloader from './components/Preloader/Preloader';

const API_URL = 'https://rickandmortyapi.com/api/character/';

const App = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState({
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: null,
    },
    results: [
      {
        id: 0,
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
        origin: {
          name: '',
          url: '',
        },
        location: {
          name: '',
          url: '',
        },
        image: '',
        episode: [''],
        url: '',
        created: '',
      },
    ],
  });

  const getSearchText = (searchText: string) => {
    setInputValue(searchText);
  };

  const getCards = (url: string) => {
    try {
      axios
        .get(url)
        .then((response) => {
          const cards = response.data;
          setCards(cards);
          setIsLoading(false);
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            console.log(err.message);
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      }

      setIsLoading(true);
    }
  };

  useEffect(() => {
    localStorage.getItem('searchText')?.length
      ? setInputValue(String(localStorage.getItem('searchText')))
      : setInputValue('');

    const url = localStorage.getItem('searchText')?.length
      ? API_URL + `?name=${String(localStorage.getItem('searchText'))}`
      : API_URL;

    getCards(url);
    setIsLoading(true);
  }, [inputValue]);

  return (
    <>
      <Header getSearchText={getSearchText} />
      <main>
        {!isLoading ? (
          <Cards>
            {cards.results.length &&
              cards.results.map((item) => (
                <Card key={item.id} name={item.name} image={item.image} />
              ))}
          </Cards>
        ) : (
          <Preloader />
        )}
      </main>
    </>
  );
};

export default App;
