import React from "react";
import { render } from "@testing-library/react";
import AboutSection from "../AboutSection";
import "@testing-library/jest-dom";

describe("AboutSection", () => {
  const weight = 60;
  const height = 1.2;
  const abilities = [
    { ability: { name: "Overgrow" } },
    { ability: { name: "Chlorophyll" } },
  ];

  test("renders weight, height, and abilities correctly", () => {
    const { getByText } = render(
      <AboutSection weight={weight} height={height} abilities={abilities} />
    );

    expect(getByText(`${weight}`)).toBeInTheDocument();
    expect(getByText(`${height}`)).toBeInTheDocument();
    abilities.slice(0, 2).forEach((ability) => {
      expect(getByText(ability.ability.name)).toBeInTheDocument();
    });

    expect(getByText(/weight/i)).toBeInTheDocument();
    expect(getByText(/height/i)).toBeInTheDocument();
  });
});
