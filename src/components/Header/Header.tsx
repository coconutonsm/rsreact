import React, { ChangeEvent, useEffect, useState } from 'react';
import './header.scss';
import { getAllSearchCards } from '../../services/getData';
import { API_URL } from '../../consts';

type props = {
  setInputValue: (x: string) => void;
  setCurrentPage: (x: number) => void;
  setCountCardsSearch: (x: number) => void;
};

const Header: React.FC<props> = ({
  setInputValue,
  setCurrentPage,
  setCountCardsSearch,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(
    localStorage.getItem('searchText') || ''
  );

  const setAllSearchCards = async (url: string) => {
    if (searchText) {
      const allItemsForSearch = await getAllSearchCards(url);
      if (allItemsForSearch) {
        setCountCardsSearch(allItemsForSearch);
      }
    }
  };

  const handleSubmit = () => {
    setInputValue(searchText);
    setCurrentPage(1);
    localStorage.setItem('searchText', searchText);
    const url = searchText
      ? API_URL + `?beer_name=${searchText}&per_page=${80}`
      : API_URL;
    setAllSearchCards(url);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim());
  };

  const handleErrorSubmit = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (localStorage.getItem('searchText')?.length) {
      const url = searchText
        ? API_URL + `?beer_name=${searchText}&per_page=${80}`
        : API_URL;
      setAllSearchCards(url);
    }
  }, []);

  if (hasError) {
    throw Error('Error!!');
  }

  return (
    <header className="header">
      <div className="search">
        <input
          type="text"
          className="searcInput"
          onChange={handleChange}
          value={searchText}
          placeholder="Enter value"
        />
        <button className="button" onClick={handleSubmit}>
          Search
        </button>
        <button className="button" onClick={handleErrorSubmit}>
          Throw Error
        </button>
      </div>
    </header>
  );
};

export default Header;
