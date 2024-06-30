import React from 'react';
import BookList from '@/components/BookList';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const HomePage: React.FC = () => {
  return (
    <div>
      <BookList />
      <ToastContainer hideProgressBar={true} autoClose={3000} position="bottom-right" />
    </div>
  );
};

export default HomePage;
