import React, { useContext } from 'react';
import '../App.css';
import MyContext from '../Context/MyContext';

function Table() {
  // const [names, editNames] = useState('');

  const { filterApi, moviesNames } = useContext(MyContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
        </tr>
      </thead>
      {
        filterApi.map((item, index) => (
          <tbody key={ index }>
            <tr className="teste">
              <td data-testid="planet-name">
                <a href={ item.url }>
                  {item.name}
                </a>
              </td>
              <td>
                {item.rotation_period}
              </td>
              <td>
                {item.orbital_period}
              </td>
              <td>
                {item.diameter}
              </td>
              <td>
                {item.climate}
              </td>
              <td>
                {item.gravity}
              </td>
              <td>
                {item.terrain}
              </td>
              <td>
                {item.surface_water}
              </td>
              <td>
                {item.population}
              </td>
              <td>
                {item.films.map((film) => (
                  <div key={ film }>
                    <a href={ film }>
                      { moviesNames[(film.split('/')[5])] }
                    </a>
                    <br />
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        ))
      }

    </table>
  );
}

export default Table;
