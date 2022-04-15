import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, update } from '../utils/apis/BooksAPI';

function Book() {
  const [book, setBook] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [reRender, setReRender] = useState('');

  const urlParam = useParams();
  useEffect(
    () => {
      get(urlParam.bookId).then(data => {
        setBook(data);
        setloaded(true);
      });
    },
    [reRender]
  );
  console.log(book);
  const navigator = useNavigate();
  return loaded ? (
    <>
      <button className='close-book' onClick={() => navigator(-1)}>
        Close
      </button>
      <div className='list-books-title'>
        <h1>{book.title}</h1>
      </div>
      <div className='book-section'>
        <div className='bookSection-img_side'>
          <img
            className='bookSection-img'
            src={book.imageLinks.thumbnail}
            alt=''
          />
        </div>
        <div className='bookSection-content_side'>
          <div className='bookSection-book_shelf'>
            <h4> author </h4>
            <p>{(book.authors || []).map(author => author)}</p>
            <h3> Shelf</h3>
            <select
              style={{
                border: 'none',
                fontSize: '15px',
                padding: '0 28px 0 0',
                cursor: 'pointer',
              }}
              onChange={e => {
                update(book, e.target.value);
                setReRender(e.target.value);
              }}
              value={reRender || book.shelf}
            >
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>

            <div>
              <h3>Description</h3>
              <p className='bookSection-content_side-description'>
                {book.description}
              </p>
            </div>
            <div>
              <h3>Puplshied</h3>
              <p className='bookSection-content_side-description'>
                {book.publishedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className='lds-grid'>Loading</div>
  );
}

export default Book;
