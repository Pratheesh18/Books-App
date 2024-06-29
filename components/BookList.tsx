'use client' 

import React, { useState, useEffect } from 'react';
import { Book } from '../types/types';
import AddBookModal from './AddBookModal';
import Pagination from './Pagination';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const booksPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);


  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3001/books?sort=title,author&order=asc`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data: Book[] = await response.json();
      console.log('Fetched books:', data);
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
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

  return (
    <div className="bg-gray-100 min-h-screen pb-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h2 className="text-2xl font-bold">Book List</h2>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Book
          </button>
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
                style={{ backgroundColor: '#4a7ba6' }} // Setting background color
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
        {showModal && (
          <AddBookModal onAddBook={handleAddBook} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default BookList;




