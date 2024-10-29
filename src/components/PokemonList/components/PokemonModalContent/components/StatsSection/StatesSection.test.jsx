import React from "react";
import { render, screen } from "@testing-library/react";
import StatsSection from "../StatsSection";
import "@testing-library/jest-dom";

describe("StatsSection", () => {
  const typeColors = {
    normal: "#68C7B8",
    darker: "#3D8A8A",
  };

  const pokemonStats = [
    { label: "Attack", value: 100 },
    { label: "special-attack", value: 80 },
    { label: "defense", value: 120 },
  ];

  test("renders Base Stats heading", () => {
    render(
      <StatsSection pokemonStats={pokemonStats} typeColors={typeColors} />
    );
    const heading = screen.getByText(/Base Stats/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders all stats correctly", () => {
    render(
      <StatsSection pokemonStats={pokemonStats} typeColors={typeColors} />
    );

    expect(screen.getByText("Attack")).toBeInTheDocument();
    expect(screen.getByText("S-Atk")).toBeInTheDocument();
    expect(screen.getByText("Defense")).toBeInTheDocument();

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  test("applies correct styles based on typeColors", () => {
    render(
      <StatsSection pokemonStats={pokemonStats} typeColors={typeColors} />
    );

    const firstStatLabel = screen.getByText("Attack");
    expect(firstStatLabel).toHaveStyle(`color: ${typeColors.normal}`);
  });

  test("handles missing typeColors gracefully", () => {
    render(<StatsSection pokemonStats={pokemonStats} typeColors={null} />);

    expect(screen.getByText("Attack")).toBeInTheDocument();
    expect(screen.getByText("S-Atk")).toBeInTheDocument();
    expect(screen.getByText("Defense")).toBeInTheDocument();
  });

  test("formats special attack and special defense labels correctly", () => {
    const specialStats = [
      { label: "special-attack", value: 60 },
      { label: "special-defense", value: 70 },
    ];

    render(
      <StatsSection pokemonStats={specialStats} typeColors={typeColors} />
    );

    expect(screen.getByText("S-Atk")).toBeInTheDocument();
    expect(screen.getByText("S-Def")).toBeInTheDocument();
  });
});
