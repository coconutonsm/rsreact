import axios from 'axios';

export const getCards = async (
  url: string,
  setCards: React.Dispatch<React.SetStateAction<resultItem[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    axios
      .get(url)
      .then((response) => {
        const cards: resultItem[] = response.data;
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
