import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({setLocationHandler}) {
    const [query, setQuery] = useState('');

    function changeHandler(e){
        setQuery(e.target.value);
    }
    function handleClick(){
        setLocationHandler(query);
        console.log(query);
    }
    function keyPressCheckHandler(e){
        if(e.keyCode === 13){
            setLocationHandler(query);
            console.log("again:" + query);
        }
    }
    return (
        <span className="searchbar">
      <input
          type="text"
          name="search"
          value={query}
          placeholder="Zoek een stad in Nederland"
          onChange={changeHandler}
          onKeyUp={keyPressCheckHandler}
      />

      <button type="button" onClick={handleClick}>
        Zoek
      </button>
    </span>
    );
};

export default SearchBar;
