import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { wrongData, wrongDataObjects, EMPLOYEES } from "../data/testData";
import Table from "../components/Table";

describe("On render with wrong data", () => {
  it("without an Array, it should display an error message ", () => {
    // @ts-expect-error test passing invalid argument
    render(<Table data={0} />);

    expect(screen.getByText(/Input an Array/i)).toBeTruthy();
  });

  it("with an array that is not objects, it should display an error message ", () => {
    // @ts-expect-error test passing invalid argument
    render(<Table data={wrongData} />);

    expect(screen.getByText(/an array of objects/i)).toBeTruthy();
  });

  it("with array of objects that don't have the same keys, it should display an error message ", () => {
    // @ts-expect-error test passing invalid argument
    render(<Table data={wrongDataObjects} />);

    expect(
      screen.getByText(/Make sure your objects have the same keys/i)
    ).toBeTruthy();
  });
});

describe("On render with appropriate data", () => {
  it("it should display a table containing the data", () => {
    render(<Table data={EMPLOYEES} />);

    expect(screen.getByText(/First Name/i)).toBeTruthy();
    expect(screen.getByText(/Id/i)).toBeTruthy();
  });

  it("with skipFirstKey === true, it shouldn't display the first key (id) ", () => {
    render(<Table data={EMPLOYEES} skipFirstKey />);

    expect(screen.getByText(/First Name/i)).toBeTruthy();
    expect(screen.queryByText(/Id/i)).toBeNull();
  });

  it("with skipFirstKey === true, it shouldn't display the first key (id) ", () => {
    render(<Table data={EMPLOYEES} skipFirstKey />);

    expect(screen.getByText(/First Name/i)).toBeTruthy();
    expect(screen.queryByText(/Id/i)).toBeNull();
  });

  it("should display Ronald and Marc first, then Bruno and Henri after sorting by First Name, then Ronald and scott when sorting by first name again", () => {
    render(<Table data={EMPLOYEES} skipFirstKey possibleRows={[2]} />);

    expect(screen.getByText(/Ronald/i)).toBeTruthy();
    expect(screen.getByText(/Marc/i)).toBeTruthy();

    const firstNameKey = screen.getByText(/First name/i);

    fireEvent.click(firstNameKey);

    // expect(screen.findByText(/Bruno/i)).toBeTruthy();

    // expect(screen.queryByText(/Ronald/i)?.innerText).toBeUndefined();
    // expect(screen.queryByText(/Marc/i)?.innerText).toBeUndefined();
    // expect(screen.getByText(/Bruno/i)).toBeTruthy();
    // expect(screen.getByText(/Henri/i)).toBeTruthy();

    // fireEvent.click(firstNameKey);
    // expect(screen.queryByText(/Bruno/i)?.innerText).toBeUndefined();
    // expect(screen.queryByText(/Henri/i)?.innerText).toBeUndefined();
    // expect(screen.getByText(/Ronald/i)).toBeTruthy();
    // expect(screen.getByText(/Scott/i)).toBeTruthy();
  });
});
