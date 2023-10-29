/// <reference types="vite/client" />

type resultItem = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type infoResult = {
  info?: {
    count: number;
    pages: number;
    next: string;
    prev: number | null;
  };
  results: resultItem[];
};
