import './App.scss';
import React from 'react';
import Header from './components/Header/Header';
import axios from 'axios';
import Cards from './components/Cards/Cards';
import Card from './components/Card/Card';
import Preloader from './components/Preloader/Preloader';

type props = Record<string, never>;

type state = {
  inputValue: string;
  cards: infoResult;
  isLoading: boolean;
};

const API_URL = 'https://rickandmortyapi.com/api/character/';

class App extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      inputValue: localStorage.getItem('searchText')?.length
        ? String(localStorage.getItem('searchText'))
        : '',
      cards: {
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
      },
      isLoading: true,
    };
  }

  getSearchText = (searchText: string) => {
    this.setState({ inputValue: searchText });
  };

  getCards(url: string) {
    try {
      axios
        .get(url)
        .then((response) => {
          const cards = response.data;
          this.setState({ isLoading: false, cards: cards });
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

      this.setState({ isLoading: true });
    }
  }

  componentDidMount() {
    const url = localStorage.getItem('searchText')?.length
      ? API_URL + `?name=${String(localStorage.getItem('searchText'))}`
      : API_URL;

    this.getCards(url);
    this.setState({ isLoading: true });
  }

  componentDidUpdate(
    prevProps: Readonly<props>,
    prevState: Readonly<state>
  ): void {
    if (prevState.inputValue !== this.state.inputValue) {
      const url = `${API_URL}?name=${this.state.inputValue}`;
      this.getCards(url);
      this.setState({ isLoading: true });
    }
  }

  render() {
    const cards = this.state.cards.results;
    return (
      <>
        <Header getSearchText={this.getSearchText} />
        <main>
          {!this.state.isLoading ? (
            <Cards>
              {cards.length &&
                cards.map((item) => (
                  <Card key={item.id} name={item.name} image={item.image} />
                ))}
            </Cards>
          ) : (
            <Preloader />
          )}
        </main>
      </>
    );
  }
}

export default App;
