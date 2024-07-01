import React, { useState } from 'react';
import { Book } from '../types/types';
import axios from 'axios';

interface AddBookModalProps {
  onAddBook: (book: Book) => void;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onAddBook, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
      setError('Title and author are required.');
      return;
    }

    try {
      const response = await axios.post<Book>('http://localhost:3001/books', {
        title,
        author,
      });

      const newBook = response.data;
      onAddBook(newBook);
      onClose();
      setTitle('');
      setAuthor('');
    } catch (err) {
      console.error('Error adding book:', err);
      let errorMessage = 'Error adding book. Please try again later.';
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        errorMessage = `Error adding book: ${err.response.data.message || err.response.data}`;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Add Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete='off'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              autoComplete='off'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className=" mt-5  mb-5 text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
