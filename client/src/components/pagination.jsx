import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../store/actions';


export default function Pagination() {
    let dispatch = useDispatch()
    let pagination = useSelector((state) => state.paginationArray)
    
    
    return (
        <div>
            {pagination.map((page, index) => (
              <button key={index} onClick={() => dispatch(changePage(index + 1))}>
                  {index + 1}
              </button>
            ))}
        </div>
      );
}
