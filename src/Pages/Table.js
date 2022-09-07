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
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface_Water</th>
          <th>Population</th>
          <th className="filmsH">Films</th>
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
