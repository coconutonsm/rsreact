import { Dispatch } from 'react';

export type TypeSearchState = {
  search: string;
  cards: resultItem[];
  dispatch: Dispatch<TypeAction>;
};

export const enum REDUCE_ACTION_TYPE {
  SEARCH_VALUE,
  CARDS_DATA,
}

export type TypeAction =
  | {
      type: REDUCE_ACTION_TYPE.CARDS_DATA;
      payload: resultItem[];
    }
  | {
      type: REDUCE_ACTION_TYPE.SEARCH_VALUE;
      payload: string;
    };
