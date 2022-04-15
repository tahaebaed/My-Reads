import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookItem from '../components/BookItem';
import * as bookAPI from '../utils/apis/BooksAPI';

const ListBooks = () => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [reRender, setReRender] = useState('');
  const [loaded, setLoaded] = useState(false);

  const handleUpdate = (book, shelf) => bookAPI.update(book, shelf);

  const getData = () =>
    bookAPI.getAll().then(data => {
      setCurrentlyReading(
        data.filter(book => book.shelf === 'currentlyReading')
      );
      setWantToRead(data.filter(book => book.shelf === 'wantToRead'));
      setRead(data.filter(book => book.shelf === 'read'));
      setLoaded(true);
    });
  useEffect(
    () => {
      getData();
    },
    [reRender]
  );

  const navigator = useNavigate();

  return loaded ? (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Currently Reading</h2>
            <div className='bookshelf-books'>
              <ol className='books-grid'>
                {currentlyReading.map(book => (
                  <BookItem
                    key={book.id}
                    book={book}
                    handleUpdate={handleUpdate}
                    setReRender={setReRender}
                  />
                ))}
              </ol>
            </div>
          </div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Want to Read</h2>
            <div className='bookshelf-books'>
              <ol className='books-grid'>
                {wantToRead.map(book => (
                  <BookItem
                    key={book.id}
                    book={book}
                    setReRender={setReRender}
                    handleUpdate={handleUpdate}
                  />
                ))}
              </ol>
            </div>
          </div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Read</h2>
            <div className='bookshelf-books'>
              <ol className='books-grid'>
                {read.map(book => (
                  <BookItem
                    setReRender={setReRender}
                    key={book.id}
                    book={book}
                    handleUpdate={handleUpdate}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className='open-search'>
        <button
          onClick={() => {
            navigator('/search');
          }}
        >
          Add a book
        </button>
      </div>
    </div>
  ) : (
    <div className='lds-grid'>Loading</div>
  ); // This Statment to handle loaded screen if user didn't get any data from the api
};

export default ListBooks;
