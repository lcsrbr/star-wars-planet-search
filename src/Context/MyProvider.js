import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [api, editApi] = useState([]);
  const [filterApi, editFilterApi] = useState([]);
  const [planetName, editPlanetName] = useState('');
  const [column, editColumn] = useState('population');
  const [columnFilter, editColumnFilter] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [moreOrLess, editMoreOrLess] = useState('maior que');
  const [quant, editQuant] = useState(0);
  const [fillArr, editFillArr] = useState([]);
  const [orderColumn, editOrderColumn] = useState('population');
  const [sortColumn, editSortColumn] = useState('asc');

  useEffect(() => {
    const apiFunc = async () => {
      const response = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const starWars = await fetch(response);
      const data = await starWars.json();
      editApi(data.results);
      editFilterApi(data.results);
    };
    apiFunc();
  }, []);

  // const array = [];
  // const arrayNamesOfFilms = async () => {
  //   const arrayFilms = filterApi.map((planet) => (planet.films));
  //   arrayFilms
  //     .map((planet) => planet
  //       .forEach((url) => fetch(url)
  //         .then((response) => response.json())
  //         .then((data) => console.log(data.title))));
  //   // setArray.map((item) => item[0]);
  //   // editNames(setArray.map(async (item) => item[0]));
  // };

  // useEffect(() => {
  //   arrayNamesOfFilms();
  // }, [filterApi]);

  const moviesNames = {
    1: 'A New Hope',
    2: 'The Empire Strikes Back',
    3: 'Return of the Jedi',
    4: 'The Phantom Menace',
    5: 'Attack of the Clones',
    6: 'Revenge of the Sith',
  };

  const handlePlanetName = ({ target }) => {
    editPlanetName(target.value);
    const filter = api.filter((planet) => planet.name.toLowerCase()
      .includes(target.value.toLowerCase()));
    editFilterApi(filter);
  };

  const handleColumn = ({ target }) => {
    editColumn(target.value);
  };

  const handleMoreOrLess = ({ target }) => {
    editMoreOrLess(target.value);
  };

  const handleQuant = ({ target }) => {
    editQuant(target.value);
  };

  const numbersFilter = () => {
    const filter = filterApi.filter((planet) => {
      let data;
      if (moreOrLess === 'maior que') {
        data = Number(planet[column]) > quant;
      }
      if (moreOrLess === 'menor que') {
        data = Number(planet[column]) < quant;
      }
      if (moreOrLess === 'igual a') {
        data = Number(planet[column]) === Number(quant);
      }
      return data;
    });
    const columnFiltered = columnFilter.filter((fill) => fill !== column);
    editFilterApi(filter);
    editFillArr([...fillArr, { column, moreOrLess, quant, id: fillArr.length }]);
    editColumnFilter(columnFiltered);
    editColumn(columnFiltered[0]);
  };

  const outraFuncao = (remFilter, param) => {
    const updatedFilter = fillArr.filter((fill) => fill.id !== param.id);
    const filterAfterDelete = ([...filterApi, ...remFilter]);
    if (updatedFilter.length > 0) {
      let teste;
      for (let i = 0; i < updatedFilter.length; i += 1) {
        teste = filterAfterDelete.filter((planet) => {
          let data;
          if (updatedFilter[i].moreOrLess === 'maior que') {
            data = Number(planet[updatedFilter[i].column]) > updatedFilter[i].quant;
          }
          if (updatedFilter[i].moreOrLess === 'menor que') {
            data = Number(planet[updatedFilter[i].column]) < updatedFilter[i].quant;
          }
          if (updatedFilter[i].moreOrLess === 'igual a') {
            data = Number(planet[updatedFilter[i].column])
          === Number(updatedFilter[i].quant);
          }
          return data;
        });
      }
      editFilterApi(teste);
    }
    editFillArr(updatedFilter);
    editColumnFilter([param.column, ...columnFilter]);
    editColumn(columnFilter[0]);
  };

  const removeFilter = (param) => {
    const remFilter = api.filter((planet) => {
      let data;
      if (param.moreOrLess === 'maior que') {
        data = (Number(planet[param.column]) <= param.quant)
        + (planet[param.column] === 'unknown');
      }
      if (param.moreOrLess === 'menor que') {
        data = (Number(planet[param.column]) >= param.quant)
        + (planet[param.column] === 'unknown');
      }
      if (param.moreOrLess === 'igual a') {
        data = Number(planet[param.column]) !== Number(param.quant);
      }
      return data;
    });
    const updatedFilter = fillArr.filter((fill) => fill.id !== param.id);
    const filterAfterDelete = ([...filterApi, ...remFilter]);
    if (updatedFilter.length === 0) {
      editFilterApi(filterAfterDelete);
    }
    outraFuncao(remFilter, param);
  };

  const cleanFilter = () => {
    editFilterApi(api);
    editFillArr([]);
    editColumnFilter(['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
    editColumn(columnFilter[0]);
  };

  const handleOrder = ({ target }) => {
    editOrderColumn(target.value);
  };

  const orderResults = () => {
    const apiCopy = [...filterApi];
    apiCopy.sort((a, b) => Number(b[orderColumn])
      - Number(a[orderColumn]));
    if (sortColumn === 'asc') {
      const fill = apiCopy.sort((b, a) => Number(b[orderColumn])
      - Number(a[orderColumn]));
      editFilterApi(fill);
    }

    if (sortColumn === 'desc') {
      const fill = apiCopy.sort((a, b) => Number(b[orderColumn])
      - Number(a[orderColumn]));
      editFilterApi(fill);
    }
  };

  return (
    <MyContext.Provider
      value={ { api,
        filterApi,
        planetName,
        handlePlanetName,
        column,
        handleColumn,
        columnFilter,
        moreOrLess,
        handleMoreOrLess,
        quant,
        handleQuant,
        numbersFilter,
        fillArr,
        removeFilter,
        cleanFilter,
        orderColumn,
        handleOrder,
        orderResults,
        editSortColumn,
        moviesNames } }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
