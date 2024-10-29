import React from "react";
import { render, screen } from "@testing-library/react";
import TypesBadges from "../TypesBadges";
import { POKEMON_TYPE_COLORS } from "@constants/pokemonTypes";
import { capitalizeFirstLetter } from "@utils/string";
import "@testing-library/jest-dom";

describe("TypesBadges", () => {
  const types = [
    { type: { name: "fire" } },
    { type: { name: "water" } },
    { type: { name: "grass" } },
  ];

  test("renders type badges correctly", () => {
    render(<TypesBadges types={types} />);

    types.forEach(({ type }) => {
      const badge = screen.getByText(capitalizeFirstLetter(type.name));
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle(
        `background-color: ${POKEMON_TYPE_COLORS[type.name].normal}`
      );
    });
  });

  test("does not render anything when types array is empty", () => {
    render(<TypesBadges types={[]} />);
    const badgesContainer = screen.queryByRole("list");
    expect(badgesContainer).not.toBeInTheDocument();
  });

  test("does not render anything when types prop is null", () => {
    render(<TypesBadges types={null} />);
    const badgesContainer = screen.queryByRole("list");
    expect(badgesContainer).not.toBeInTheDocument();
  });

  test("handles types with special characters correctly", () => {
    const specialTypes = [
      { type: { name: "dragon-type" } },
      { type: { name: "flying" } },
    ];

    render(<TypesBadges types={specialTypes} />);

    specialTypes.forEach(({ type }) => {
      const badge = screen.getByText(capitalizeFirstLetter(type.name));
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle(
        `background-color: ${POKEMON_TYPE_COLORS[type.name]?.normal}`
      );
    });
  });
});
