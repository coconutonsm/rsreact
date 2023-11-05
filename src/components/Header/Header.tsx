import React, { ChangeEvent, useEffect, useState } from 'react';
import './header.scss';

type props = {
  getSearchText: (x: string) => void;
  setCurrentPage: (x: number) => void;
};

const Header: React.FC<props> = ({ getSearchText, setCurrentPage }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = () => {
    getSearchText(inputValue);
    setCurrentPage(1);
    localStorage.setItem('searchText', inputValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleErrorSubmit = () => {
    setHasError(true);
  };

  useEffect(() => {
    localStorage.getItem('searchText')?.length
      ? setInputValue(String(localStorage.getItem('searchText')))
      : setInputValue('');
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
          value={inputValue}
          placeholder="Enter character name"
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
