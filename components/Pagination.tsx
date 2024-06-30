import React from 'react';

interface PaginationProps{
    totalPages : number;
    currentPage : number;
    paginate : (pageNumber:number) => void;
}


const Pagination : React.FC<PaginationProps> = ({totalPages , currentPage , paginate}) => {
    const pageNumbers = Array.from({length:totalPages} , (_,i) => i+1);

    return(
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-3">
        <ul className="flex justify-center items-center space-x-2">
          <li>
            <button
                 onClick={() => currentPage > 1 && paginate(currentPage-1)}
                 disabled = {currentPage === 1}
                 className={`py-2 px-3 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed ' : ''}`}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`py-2 px-3 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 ${currentPage === number ? 'bg-blue-700' : ''}`}
                >
                {number}
              </button>
            </li>
          ))}
         <li>
          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-2 px-3 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </li>
        </ul>
      </nav>
    )
};

export default Pagination;