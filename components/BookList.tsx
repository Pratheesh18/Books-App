'use client' 

import React, { useState, useEffect } from 'react';
import { Book } from '../types/types';
import AddBookModal from './AddBookModal';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

 
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  
  
  
  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]); 
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center mt-4">Book List</h2>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Book
        </button>
        {showModal && (
          <AddBookModal onAddBook={handleAddBook} onClose={closeModal} />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;

