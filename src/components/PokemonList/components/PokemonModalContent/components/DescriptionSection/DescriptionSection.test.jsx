import React from "react";
import { render } from "@testing-library/react";
import DescriptionSection from "../DescriptionSection";
import "@testing-library/jest-dom";

describe("DescriptionSection", () => {
  const pokemonDescription = "This is a sample Pokémon description.";

  test("renders loading skeleton when descriptionLoading is true", () => {
    const { container } = render(
      <DescriptionSection
        pokemonDescription={pokemonDescription}
        descriptionLoading={true}
      />
    );

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(container.querySelectorAll(".block.h-2")).toHaveLength(3);
  });

  test("renders the Pokémon description when loading is false", () => {
    const { getByText } = render(
      <DescriptionSection
        pokemonDescription={pokemonDescription}
        descriptionLoading={false}
      />
    );

    expect(getByText(pokemonDescription)).toBeInTheDocument();
  });
});
