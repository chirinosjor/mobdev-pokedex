import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PokemonListPagination from "../Pagination";
import "@testing-library/jest-dom";

describe("PokemonListPagination", () => {
  let currentPage,
    totalPokemons,
    pokemonsPerPage,
    setCurrentPage,
    setPokemonsPerPage;

  beforeEach(() => {
    currentPage = 1;
    totalPokemons = 50;
    pokemonsPerPage = 10;
    setCurrentPage = jest.fn();
    setPokemonsPerPage = jest.fn();
  });

  const renderComponent = () =>
    render(
      <PokemonListPagination
        currentPage={currentPage}
        totalPokemons={totalPokemons}
        pokemonsPerPage={pokemonsPerPage}
        setCurrentPage={setCurrentPage}
        setPokemonsPerPage={setPokemonsPerPage}
      />
    );

  test("renders pagination with correct initial values", () => {
    const { getByText } = renderComponent();

    expect(getByText(/Page/i, { selector: "p" })).toBeInTheDocument();
    expect(getByText(/Page/i, { selector: "p" })).toHaveTextContent(
      "Page 1 of 5"
    );
  });

  test("calls setCurrentPage with incremented page on Next button click", () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText(/next/i));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  test("calls setCurrentPage with decremented page on Previous button click", () => {
    currentPage = 2;
    const { getByText } = renderComponent();

    fireEvent.click(getByText(/previous/i));
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  test("does not call setCurrentPage on Previous button click if on first page", () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText(/previous/i));
    expect(setCurrentPage).not.toHaveBeenCalled();
  });

  test("does not call setCurrentPage on Next button click if on last page", () => {
    currentPage = 5;
    const { getByText } = renderComponent();

    fireEvent.click(getByText(/next/i));
    expect(setCurrentPage).not.toHaveBeenCalled();
  });

  test("calls setPokemonsPerPage and setCurrentPage when changing the per-page select", () => {
    const { getByLabelText } = renderComponent();
    const select = getByLabelText(/pokémons per page/i);

    fireEvent.change(select, { target: { value: "20" } });
    expect(setPokemonsPerPage).toHaveBeenCalledWith(20);
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });
});
