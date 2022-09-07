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
  it('Realiza a requisição e retorna uma tabela', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
      const nameFilter = screen.getByTestId('name-filter');
      expect(nameFilter).toBeInTheDocument();
      const columnFilter = screen.getByTestId('column-filter');
      expect(columnFilter).toBeInTheDocument();
      const comparisonFilter = screen.getByTestId('comparison-filter');
      expect(comparisonFilter).toBeInTheDocument();
      const valueFilter = screen.getByTestId('value-filter');
      expect(valueFilter).toBeInTheDocument();
      const buttonFilter = screen.getByTestId('button-filter');
      expect(buttonFilter).toBeInTheDocument();
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
  });
  it('Realiza a pesquisa através do campo de valores', async () => {
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
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(valueFilter, '30000000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(5);
  });
  it('Realiza a pesquisa através do campo de valores (menor que)', async () => {
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
    const buttonRemEachFilter = screen.getByTestId('button-remove-each-filter');
    expect(buttonRemEachFilter).toBeInTheDocument();
    fireEvent.click(buttonRemEachFilter);
    await waitFor(() => {
      const teste = screen.getAllByRole('row');
      expect(teste).toHaveLength(11);
    });
  });

  it('Testa se o filtro se mantém com mais de um filtro ativo(maior que)', async () => {
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
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(valueFilter, '30000000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(5);
    });
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '400');
    fireEvent.click(buttonFilter);
    const buttonRemEachFilter = screen.getAllByTestId('button-remove-each-filter');
    fireEvent.click(buttonRemEachFilter[1]);
    await waitFor(() => {
      const teste2 = screen.getAllByRole('row');
      expect(teste2).toHaveLength(5);
    });
  });
  it('Testa se o filtro se mantém com mais de um filtro ativo(menor que)', async () => {
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
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(valueFilter, '30000000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(5);
    });
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '400');
    fireEvent.click(buttonFilter);
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(5);
    });
  });
  it('Testa se o filtro se mantém com mais de um filtro ativo(igual a)', async () => {
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
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(valueFilter, '30000000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(5);
    });
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '400');
    fireEvent.click(buttonFilter);
    const buttonRemEachFilter = screen.getAllByTestId('button-remove-each-filter');
    fireEvent.click(buttonRemEachFilter[1]);
    await waitFor(() => {
      const teste2 = screen.getAllByRole('row');
      expect(teste2).toHaveLength(5);
    });
  });
  it('Realiza a pesquisa através do campo de valores (igual a)', async () => {
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
    userEvent.type(valueFilter, '30000000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(2);
  });
});
