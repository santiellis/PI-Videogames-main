import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../store/actions';


export default function Pagination() {
    let dispatch = useDispatch()
    let pagination = useSelector((state) => state.paginationArray)
    var scrollTop = function() {
      window.scrollTo(0, 0);
  }
    
    return (
        <div>
            {pagination.map((page, index) => (
              <button key={index} onClick={() => dispatch(changePage(index + 1)) && scrollTop()}>
                  {index + 1}
              </button>
            ))}
        </div>
      );
}
