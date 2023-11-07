import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2>NotFoundPage</h2>
      <button onClick={handleClick}>Back</button>
    </div>
  );
};

export default NotFoundPage;
