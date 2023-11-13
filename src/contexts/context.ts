import { createContext } from 'react';
import {
  REDUCE_ACTION_TYPE,
  TypeAction,
  TypeSearchState,
} from '../types/types';

export const initialState: TypeSearchState = {
  search: localStorage.getItem('searchText') || '',
  cards: [],
  dispatch: function (): void {},
};

export const SearchContext = createContext(initialState);

export const SearchReducer = (
  state: TypeSearchState,
  action: TypeAction
): typeof initialState => {
  switch (action.type) {
    case REDUCE_ACTION_TYPE.SEARCH_VALUE:
      return { ...state, search: action.payload };
    case REDUCE_ACTION_TYPE.CARDS_DATA:
      return { ...state, cards: action.payload };
    default:
      throw new Error();
  }
};
