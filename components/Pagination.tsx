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
        </ul>
      </nav>
    )
};

export default Pagination;