import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("On app load", () => {
  it("App renders correctly", () => {
    render(<App />);
  });
});
