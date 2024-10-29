import React from "react";
import { render } from "@testing-library/react";
import StatePokemonList from "../StatePokemonList";
import "@testing-library/jest-dom";

describe("StatePokemonList", () => {
  const title = "Pokémon List";
  const imgSrc = "https://example.com/pokemon.png";

  test("renders the title and image correctly", () => {
    const { getByText, getByAltText } = render(
      <StatePokemonList title={title} imgSrc={imgSrc} />
    );

    expect(getByText(title)).toBeInTheDocument();

    const image = getByAltText(title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imgSrc);
  });
});
