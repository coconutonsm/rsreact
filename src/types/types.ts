import { Dispatch } from 'react';

export type TypeSearchState = {
  search: string;
  cards: resultItem[];
  dispatch: Dispatch<TypeActionSeach>;
};

export const enum REDUCE_ACTION_TYPE {
  SEARCH_VALUE,
  CARDS_DATA,
}

export type TypeActionSeach =
  | {
      type: REDUCE_ACTION_TYPE.CARDS_DATA;
      payload: resultItem[];
    }
  | {
      type: REDUCE_ACTION_TYPE.SEARCH_VALUE;
      payload: string;
    };
