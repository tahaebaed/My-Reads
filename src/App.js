import React from 'react';
import ListBooks from './pages/ListBooks';
import Search from './pages/Search';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Book from './pages/Book';
import NotFound from './pages/NotFound';
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  render() {
    return (
      <div className='app'>
        <Routes>
          <Route path='/' element={<ListBooks />} />
          <Route path='/search' element={<Search />} />
          <Route path='/books/:bookId' element={<Book />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
