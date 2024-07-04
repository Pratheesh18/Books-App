'use client' 

import React, { useState, useEffect} from 'react';
import { Book } from '../types/types';
import AddBookModal from './AddBookModal';
import Pagination from './Pagination';
import axios from 'axios';
import {toast } from 'react-toastify'

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder , setSortOrder] = useState<'asc'|'desc'> ('asc');
  const [keyword , setKeyword] = useState('');
  const [debounceKeyword , setDebounceKeyword] = useState('');



  const booksPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, [sortOrder , debounceKeyword]);

  useEffect(() => { //implemented debounce function
    const handler = setTimeout(() => {
      setDebounceKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  const fetchBooks = async () => {
    setLoading(true); 
    try {
      const response = await axios.get<Book[]>('http://localhost:3001/books');
      let data = response.data;
      if(debounceKeyword){
        data = data.filter(book =>
          book.title.toLowerCase().includes(debounceKeyword.toLowerCase())
        );
      }
      const sortedBooks = data.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title, 'en-US', { sensitivity: 'base' })
          : b.title.localeCompare(a.title, 'en-US', { sensitivity: 'base' });
      });
      setBooks(sortedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleAddBook = (newBook: Book) => {
    const sortedBooks = [...books, newBook].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title, 'en-US', { sensitivity: 'base' })
        : b.title.localeCompare(a.title, 'en-US', { sensitivity: 'base' });
    });
    setBooks(sortedBooks);
    toast.success('Book Added Successfully', { position: 'bottom-right' });
  };

  const openModal = () => setShowModal(true); 
  const closeModal = () => setShowModal(false); 

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  

  return (
    <div className="bg-gray-100 min-h-screen pb-24 relative">
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center items-center mb-4 mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Books For Life
        </h2>
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mb-4">
          <input
            type="text"
            value={keyword}
            onChange={handleSearchInputChange}
            placeholder="Search by title..."
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
          />
          <button
            onClick={handleSort}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2"
          >
            Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
          >
            Add Book
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-center">Loading...</p>
        </div>
      ) : currentBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-lg shadow-md overflow-hidden"
              style={{ backgroundColor: '#4a7ba6' }}
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-white">{book.title}</h3>
                <p className="text-gray-200 mb-2">by {book.author}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-center">No books found.</p>
        </div>
      )}
      {totalPages > 1 && <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />}
      {showModal && (
        <AddBookModal onAddBook={handleAddBook} onClose={closeModal} />
      )}
    </div>
  </div>
  );
};

export default BookList;




