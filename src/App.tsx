import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import './App.scss';
import SingleCard from './components/SingleCard/SingleCard';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="card/:id" element={<SingleCard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
