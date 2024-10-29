import React from "react";
import { render, screen } from "@testing-library/react";
import ImageSection from "../ImageSection";
import "@testing-library/jest-dom";

describe("ImageSection", () => {
  const name = "pikachu";

  test("renders image with correct src and alt text when sprites are provided", () => {
    const sprites = {
      front_default: "https://example.com/pikachu.png",
    };

    render(<ImageSection sprites={sprites} name={name} />);

    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", sprites.front_default);
    expect(imgElement).toHaveAttribute("alt", name);
  });

  test("does not render an image when sprites are null", () => {
    render(<ImageSection sprites={null} name={name} />);

    const imgElement = screen.queryByRole("img");
    expect(imgElement).not.toBeInTheDocument();
  });
});
