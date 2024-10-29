import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PokemonDetail from "../PokemonDetail";
import { extractIdFromUrl } from "../../utils";
import "@testing-library/jest-dom";

jest.mock("../../utils", () => ({
  extractIdFromUrl: jest.fn(),
}));

describe("PokemonDetail", () => {
  const mockOnClick = jest.fn();
  const mockPokemon = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    sprites: {
      front_default: "https://example.com/bulbasaur.png",
    },
  };

  beforeEach(() => {
    extractIdFromUrl.mockReturnValue(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Pokémon detail with correct information", () => {
    const { getByText, getByAltText } = render(
      <PokemonDetail pokemon={mockPokemon} onClick={mockOnClick} />
    );

    expect(getByText(/#001/i)).toBeInTheDocument();
    expect(getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(getByAltText(/bulbasaur/i)).toBeInTheDocument();
  });

  test("renders fallback when no image is available", () => {
    const pokemonWithoutImage = {
      ...mockPokemon,
      sprites: { front_default: null },
    };
    const { getByText } = render(
      <PokemonDetail pokemon={pokemonWithoutImage} onClick={mockOnClick} />
    );

    expect(getByText(/no image/i)).toBeInTheDocument();
  });

  test("calls onClick function when the component is clicked", () => {
    const { getByText } = render(
      <PokemonDetail pokemon={mockPokemon} onClick={mockOnClick} />
    );

    fireEvent.click(getByText(/bulbasaur/i));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
