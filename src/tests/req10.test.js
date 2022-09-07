import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './mockData';

const api = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
};

describe('Realiza a requisição e retorna uma tabela', () => {
  beforeEach(api);
  afterEach(() => jest.clearAllMocks());

  it('Realiza ordenação (ascendente)', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const columnSort = screen.getByTestId('column-sort');
      expect(columnSort).toBeInTheDocument();
      userEvent.selectOptions(columnSort, 'population');
      const asc = screen.getByTestId('column-sort-input-asc');
      fireEvent.click(asc);
      const button = screen.getByTestId('column-sort-button');
      fireEvent.click(button);
      const planetName = screen.getAllByTestId('planet-name');
      expect(planetName[0].innerHTML).toBe('Yavin IV');
      expect(planetName[2].innerHTML).toBe('Bespin');
    });
  });
  it('Realiza ordenação (descendente)', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const columnSort = screen.getByTestId('column-sort');
      expect(columnSort).toBeInTheDocument();
      userEvent.selectOptions(columnSort, 'population');
      const asc = screen.getByTestId('column-sort-input-desc');
      fireEvent.click(asc);
      const button = screen.getByTestId('column-sort-button');
      fireEvent.click(button);
      const planetName = screen.getAllByTestId('planet-name');
      expect(planetName[0].innerHTML).toBe('Coruscant');
      expect(planetName[2].innerHTML).toBe('Alderaan');
    });
  });

  it('Realiza ordenação (ascendente)', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const columnSort = screen.getByTestId('column-sort');
      expect(columnSort).toBeInTheDocument();
      userEvent.selectOptions(columnSort, 'diameter');
      const asc = screen.getByTestId('column-sort-input-asc');
      fireEvent.click(asc);
      const button = screen.getByTestId('column-sort-button');
      fireEvent.click(button);
      const planetName = screen.getAllByTestId('planet-name');
      expect(planetName[0].innerHTML).toBe('Endor');
      expect(planetName[2].innerHTML).toBe('Dagobah');
    });
  });
  it('Realiza ordenação (descendente)', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const columnSort = screen.getByTestId('column-sort');
      expect(columnSort).toBeInTheDocument();
      userEvent.selectOptions(columnSort, 'diameter');
      const asc = screen.getByTestId('column-sort-input-desc');
      fireEvent.click(asc);
      const button = screen.getByTestId('column-sort-button');
      fireEvent.click(button);
      const planetName = screen.getAllByTestId('planet-name');
      expect(planetName[0].innerHTML).toBe('Bespin');
      expect(planetName[2].innerHTML).toBe('Alderaan');
    });
  });

  it('Realiza a pesquisa através do nome', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
    });
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    userEvent.type(nameFilter, 'oo');
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(3);
    const removeButton = screen.getByTestId('button-remove-filters');
    fireEvent.click(removeButton);
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
    });
  });
  it('Testa mais de um filtro (menor que)', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
    });
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    userEvent.selectOptions(columnFilter, 'population');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    userEvent.selectOptions(comparisonFilter, 'menor que');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(valueFilter, '30000000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(4);
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '1000');
    fireEvent.click(buttonFilter);
    const buttonRemEachFilter = screen.getAllByTestId('button-remove-each-filter');
    fireEvent.click(buttonRemEachFilter[1]);
    await waitFor(() => {
      const teste2 = screen.getAllByRole('row');
      expect(teste2).toHaveLength(4);
    });
  });

  it('Testa mais de um filtro (igual a)', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
    });
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    userEvent.selectOptions(columnFilter, 'population');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    userEvent.selectOptions(comparisonFilter, 'igual a');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(valueFilter, '200000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(2);
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '304');
    fireEvent.click(buttonFilter);
    const buttonRemEachFilter = screen.getAllByTestId('button-remove-each-filter');
    fireEvent.click(buttonRemEachFilter[1]);
    await waitFor(() => {
      const teste2 = screen.getAllByRole('row');
      expect(teste2).toHaveLength(2);
    });
  });
});
