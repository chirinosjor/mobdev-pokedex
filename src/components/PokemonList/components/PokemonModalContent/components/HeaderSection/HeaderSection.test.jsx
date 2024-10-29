import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderSection from "../HeaderSection";
import "@testing-library/jest-dom";

describe("HeaderSection", () => {
  const mockSetSelectedPokemon = jest.fn();
  const name = "pikachu";
  const id = 25;

  test("renders with correct name and id", () => {
    render(
      <HeaderSection
        name={name}
        id={id}
        setSelectedPokemon={mockSetSelectedPokemon}
      />
    );

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("#025")).toBeInTheDocument();
  });

  test("calls setSelectedPokemon with null when back button is clicked", () => {
    render(
      <HeaderSection
        name={name}
        id={id}
        setSelectedPokemon={mockSetSelectedPokemon}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockSetSelectedPokemon).toHaveBeenCalledWith(null);
  });

  test("handles empty name gracefully", () => {
    render(
      <HeaderSection
        name=""
        id={id}
        setSelectedPokemon={mockSetSelectedPokemon}
      />
    );

    expect(screen.queryByText(/Pikachu/i)).not.toBeInTheDocument();
    expect(screen.getByText("#025")).toBeInTheDocument();
  });
});
