import React from 'react';

const SearchBox = ({ searchChange }) => {
    return (
        <div className = 'pa1'>
            <input
            className = 'pa3 ba2 b--green bg-lightest-blue' 
            type = 'search' 
            placeholder = 'search robots'
            onChange = { searchChange }
            />
        </div>
    );
}

export default SearchBox;