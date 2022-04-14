import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookItem from '../components/BookItem';
import { getAll, search, update } from '../utils/apis/BooksAPI';
import '../App.css';

function Search() {
  const [query, setQuery] = useState('');
  const [reRender, setReRender] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [mainBooksArr, setMainBooksArr] = useState([]);
  const navigator = useNavigate();
  const handleUpdate = (book, shelf) => update(book, shelf);

  useEffect(
    () => {
      getAll().then(data => setMainBooksArr(data));
    },
    [reRender, setReRender]
  );

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <button className='close-search' onClick={() => navigator('/')}>
          Close
        </button>
        <div className='search-books-input-wrapper'>
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
            type='text'
            placeholder='Search by title or author'
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              e.target.value === ''
                ? setSearchResult([])
                : search(e.target.value).then(searchedData => {
                    if (!searchedData.error) {
                      setSearchResult(
                        searchedData.filter(book => book.imageLinks)
                      );
                      setErrorMsg(false);
                    } else {
                      setErrorMsg('Please serach with valied word');
                    }
                  });
              // Handle if There is no query in the input and if there is any error coming from the api call
            }}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {errorMsg ? (
            <div>{errorMsg}</div>
          ) : searchResult.length >= 0 ? (
            (searchResult || []).map(book => {
              // did || statmen here because got an error for can't use map on undfiend
              book.shelf = 'none';
              mainBooksArr.map(mainBook => {
                if (book.id === mainBook.id) {
                  book = { ...book, shelf: mainBook.shelf };
                }
                return book;
              });

              return (
                <BookItem
                  key={book.id}
                  book={book}
                  reRender={reRender}
                  setReRender={setReRender}
                  handleUpdate={handleUpdate}
                />
              );
            }) // display each book witin the array
          ) : (
            ''
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
