import React from 'react';
import './search.scss';

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <input type="text" className="searcInput" />
        <button className="button">Search</button>
      </div>
    );
  }
}

export default Search;
