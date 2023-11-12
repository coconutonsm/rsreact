import './pagination.scss';

type props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
};

const Pagination: React.FC<props> = ({
  currentPage,
  setCurrentPage,
  maxPage,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div>
        {currentPage}/{maxPage}
      </div>
      <button
        disabled={currentPage === maxPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
