import React, { useState } from 'react';
import lunr from 'lunr';
import styled from 'styled-components';

const Content = styled.div`
    position: relative;
    .input-wrapper {
        position: relative;
    }
    
    .search-input {
        width: 100%;
        padding: 10px 20px 10px 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        margin-bottom: 15px;
    }
    
    .search-results {
        position: absolute;
        top: 0;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        margin-top: 50px;
        border-radius: 5px;
        padding: 5px;
        z-index: 2;
        li {
            width: 100%;
            font-family: franklin-gothic-urw-cond,sans-serif;
            text-transform: uppercase;
            padding: 15px 5px 15px 5px;
            line-height: 1;
            &:hover {
                background-color: rgba(40, 92, 77, 0.1);
            }
        }
        a {
            padding: 15px 5px 15px 5px;
        }
    }
`;

function createSearchIndex(data) {
    return lunr(function () {
      this.ref('title'); // Specify the unique identifier field
      this.field('handle'); // Specify the fields you want to include in the index
      // Add more fields you want to include in the index (e.g., 'description', 'content', etc.)
  
      data.forEach(function (doc) {
        this.add(doc); // Add documents to the index
      }, this);
    });
  }
  
  function SearchBox({ data }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
  
      const idx = createSearchIndex(data);
      const results = idx.search(query);
  
      // Map the search results to include both title and handle fields
      const formattedResults = results.map((result) => {
        const { ref } = result;
        const foundItem = data.find(item => item.title === ref);
        const title = foundItem ? foundItem.title : '';
        const handle = foundItem ? foundItem.handle : '';
  
        return {
          title,
          handle,
        };
      });
  
      setSearchResults(formattedResults);
    };

    const handleBlur = () => {
        if (searchQuery === '') {
          setSearchResults([]);
        }
      };
  
    return (
      <Content className="input-wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onBlur={handleBlur}
          placeholder="Search for gear and clothing"
          className="search-input"
        />
        {searchQuery && searchResults.length === 0 && (
            <div className="search-results">
            No results found.
            </div>
        )}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result, index) => (
            <li key={index}>
              <a href={`${'/shop/' + encodeURIComponent(result.handle.slice(0, 50))}`}>{result.title}</a>
            </li>
          ))}
        </ul>
        )}
      </Content>
    );
  }
  
  export default SearchBox;