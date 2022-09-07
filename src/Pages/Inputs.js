import React, { useContext } from 'react';
import '../App.css';
import MyContext from '../Context/MyContext';

function Inputs() {
  const { planetName,
    handlePlanetName,
    column,
    handleColumn,
    columnFilter,
    moreOrLess,
    handleMoreOrLess,
    quant,
    handleQuant,
    numbersFilter,
    cleanFilter,
    orderColumn,
    handleOrder,
    orderResults,
    editSortColumn,
  } = useContext(MyContext);

  const orderFilter = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];
  return (
    <form>
      <div>
        <p>Search by name </p>
        <input
          type="text"
          data-testid="name-filter"
          name="input"
          placeholder="escreva aqui"
          value={ planetName }
          onChange={ handlePlanetName }
        />
      </div>
      <div className="filterSort">
        <div>
          <p>Search by filters </p>
          <select
            data-testid="column-filter"
            value={ column }
            onChange={ handleColumn }
          >
            {columnFilter.map((item) => (

              <option key={ item }>{item}</option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            value={ moreOrLess }
            onChange={ handleMoreOrLess }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
          <input
            type="number"
            data-testid="value-filter"
            value={ quant }
            onChange={ handleQuant }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ numbersFilter }
          >
            filtrar
          </button>
        </div>
        <div>
          <p>Search by sort</p>
          <select
            data-testid="column-sort"
            value={ orderColumn }
            onChange={ handleOrder }
          >
            {orderFilter.map((item) => (
              <option key={ item }>{item}</option>
            )) }
          </select>

          <label htmlFor="ascedente">
            ascedente
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              id="ascedente"
              name="fav_language"
              value="ASC"
              onClick={ () => editSortColumn('asc') }
            />
          </label>
          <label htmlFor="descendente">
            descendente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              id="descendente"
              name="fav_language"
              value="DESC"
              onClick={ () => editSortColumn('desc') }
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ orderResults }
          >
            Ordenar
          </button>
        </div>
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ cleanFilter }
      >
        Remover
      </button>
    </form>
  );
}

export default Inputs;
