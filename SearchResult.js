import React from 'react'
import './SearchResult.css'

const SearchResult = ({result}) => {
    return(
        <>
        <div className='search-result'>{result.title}</div>
        </>
    )
}
export default SearchResult;