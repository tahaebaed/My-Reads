import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function BookItem({ book, reRender, handleUpdate, setReRender }) {
  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <Link to={`/books/${book.id}`}>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            />
          </Link>
          <div className='book-shelf-changer'>
            <select
              onChange={e => {
                setReRender(e.currentTarget.value);
                handleUpdate(book, e.target.value);
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
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>
          {(book.authors || []).map(author => author)}
        </div>
      </div>
    </li>
  );
}

BookItem.prototype = {
  book: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func,
  setReRender: PropTypes.func,
  reRender: PropTypes.string,
};

export default BookItem;
