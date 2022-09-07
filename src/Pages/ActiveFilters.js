import React, { useContext } from 'react';
import '../App.css';
import MyContext from '../Context/MyContext';

function ActiveFilters() {
  const { fillArr, removeFilter } = useContext(MyContext);
  return (
    <>
      {
        fillArr.map((filter) => (
          <div key={ filter.id } data-testid="filter">
            <p>
              <span>
                {filter.column}
              </span>
              <span>
                {filter.moreOrLess}
              </span>
              <span>
                {filter.quant}
              </span>
            </p>
            <button
              type="button"
              data-testid="button-remove-each-filter"
              onClick={ () => removeFilter(filter) }
            >
              x
            </button>
          </div>
        ))

      }
    </>
  );
}

export default ActiveFilters;
