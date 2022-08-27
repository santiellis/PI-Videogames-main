import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../store/actions';
import "./button2.css"


export default function Pagination() {
    let dispatch = useDispatch()
    let loadingCheck = useSelector((state) => state.loading)
    let pagination = useSelector((state) => state.paginationArray)
    var scrollTop = function() {
      window.scrollTo(0, 0);
  }
  
  if(loadingCheck === true) {
  return <span></span>
}

    return (
        <div>
            {pagination.map((page, index) => (
              <button className="button-style10" key={index} onClick={() => dispatch(changePage(index + 1)) && scrollTop()}>
                  {index + 1}
              </button>
            ))}
        </div>
      );
  
}
