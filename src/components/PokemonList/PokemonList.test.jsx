import React from "react";
import { render } from "@testing-library/react";
import PokemonList from "../PokemonList";
import usePokemonStore from "@store/usePokemonStore";
import "@testing-library/jest-dom";

jest.mock("@store/usePokemonStore");

const setupMockStore = (overrides = {}) => {
  const defaultValues = {
    allPokemons: [],
    filteredPokemons: null,
    isLoading: false,
    setIsLoading: jest.fn(),
  };

  usePokemonStore.mockReturnValue({ ...defaultValues, ...overrides });
};

describe("PokemonList", () => {
  beforeEach(() => {
    usePokemonStore.mockClear();
  });

  describe("loading state", () => {
    it("displays loading state", () => {
      setupMockStore({ isLoading: true });

      const { getByText } = render(<PokemonList />);
      expect(getByText(/loading/i)).toBeInTheDocument();
    });

    it("displays empty state when no Pokémon are found", () => {
      setupMockStore({ isLoading: false });

      const { getByText } = render(<PokemonList />);
      expect(
        getByText(
          /We couldn't find any Pokémon, try searching for something else./i
        )
      ).toBeInTheDocument();
    });
  });

  describe("rendering Pokémon", () => {
    it("renders a list of Pokémon", () => {
      const mockPokemons = [
        {
          name: "Pikachu",
          url: "https://pokeapi.co/api/v2/pokemon/25/",
          types: [],
          sprites: {
            front_default: "",
          },
        },
        {
          name: "Charmander",
          url: "https://pokeapi.co/api/v2/pokemon/4/",
          types: [],
          sprites: {
            front_default: "",
          },
        },
      ];

      setupMockStore({
        allPokemons: mockPokemons,
        filteredPokemons: mockPokemons,
        isLoading: false,
      });

      const { getByText } = render(<PokemonList />);
      expect(getByText(/pikachu/i)).toBeInTheDocument();
      expect(getByText(/charmander/i)).toBeInTheDocument();
    });
  });

  describe("pagination", () => {
    const mockSetCurrentPage = jest.fn();
    const mockSetPokemonsPerPage = jest.fn();

    beforeEach(() => {
      jest.mock("@store/usePaginationStore", () => ({
        currentPage: 1,
        pokemonsPerPage: 10,
        setCurrentPage: mockSetCurrentPage,
        setPokemonsPerPage: mockSetPokemonsPerPage,
      }));
    });

    it("renders pagination correctly with one page", () => {
      const mockPokemons = Array.from({ length: 20 }, (_, index) => ({
        name: `Pokemon ${index + 1}`,
        url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
        types: [],
        sprites: {
          front_default: "",
        },
      }));

      setupMockStore({
        allPokemons: mockPokemons,
        filteredPokemons: mockPokemons,
        isLoading: false,
      });

      const { getByText, getByRole, container } = render(<PokemonList />);
      const paginationText = getByText(/Page/i, { selector: "p" });
      const pageNumberElement = container.querySelector("span.font-bold");
      const ofText = getByText(/of/i);

      expect(paginationText).toBeInTheDocument();
      expect(pageNumberElement).toBeInTheDocument();
      expect(pageNumberElement).toHaveTextContent("1");
      expect(ofText).toBeInTheDocument();

      const nextButton = getByRole("button", { name: /next/i });
      const prevButton = getByRole("button", { name: /previous/i });

      expect(nextButton).toBeDisabled();
      expect(prevButton).toBeDisabled();
    });

    it("renders pagination correctly with multiple pages", () => {
      const mockPokemons = Array.from({ length: 100 }, (_, index) => ({
        name: `Pokemon ${index + 1}`,
        url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
        types: [],
        sprites: {
          front_default: "",
        },
      }));

      setupMockStore({
        allPokemons: mockPokemons,
        filteredPokemons: mockPokemons,
        isLoading: false,
      });

      jest.mock("@store/usePaginationStore", () => ({
        currentPage: 1,
        pokemonsPerPage: 20,
        setCurrentPage: mockSetCurrentPage,
        setPokemonsPerPage: mockSetPokemonsPerPage,
      }));

      const { getByText, getByRole, container } = render(<PokemonList />);
      const paginationText = getByText(/Page/i, { selector: "p" });
      const pageNumberElements = container.querySelectorAll("span.font-bold");
      const ofText = getByText(/of/i);
      const firstPageNumber = pageNumberElements[0];
      const secondPageNumber = pageNumberElements[1];

      expect(pageNumberElements.length).toBe(2);
      expect(paginationText).toBeInTheDocument();
      expect(firstPageNumber).toHaveTextContent("1");
      expect(ofText).toBeInTheDocument();
      expect(secondPageNumber).toHaveTextContent("5");

      const nextButton = getByRole("button", { name: /next/i });
      const prevButton = getByRole("button", { name: /previous/i });

      expect(nextButton).not.toBeDisabled();
      expect(prevButton).toBeDisabled();
    });
  });
});
