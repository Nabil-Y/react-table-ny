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

  it("with title='random title', it should display a heading with random title as text ", () => {
    render(<Table data={EMPLOYEES} title="random title" />);

    expect(screen.getByText(/random title/i)).toBeTruthy();
  });

  it("with className='class', Table should have class='table class'", () => {
    render(<Table data={EMPLOYEES} className="class" />);

    expect(screen.getByTestId(/table/i).className).toBe("table class");
  });

  it("should display only Bruno after searching for 'Br'", async () => {
    render(<Table data={EMPLOYEES} possibleRows={[1]} />);

    const searchInput = screen.getByLabelText(/Search:/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "br" } });

    await screen.findByText(/Bruno/i);
    expect(screen.getByText(/Bruno/i)).toBeTruthy();
  });

  it("should display Ronald and Marc with 2 rows per page ", () => {
    render(<Table data={EMPLOYEES} skipFirstKey possibleRows={[2]} />);

    expect(screen.getByText(/Ronald/i)).toBeTruthy();
    expect(screen.getByText(/Marc/i)).toBeTruthy();
  });

  it("Should sort by asc order after sorting once by First Name, then by des order after sorting twice by first name, then by asc order after sorting thrice by first name", async () => {
    render(<Table data={EMPLOYEES} skipFirstKey possibleRows={[2]} />);

    fireEvent.click(screen.getByText(/First name/i), {
      target: {
        innerText: "First Name",
      },
    });
    await screen.findByText(/Bruno/i);
    expect(screen.queryByText(/Ronald/i)).toBeNull();
    expect(screen.getByText(/Bruno/i)).toBeTruthy();
    expect(screen.getByText(/First name/i).className).toBe("sorted-asc");

    fireEvent.click(screen.getByText(/First name/i), {
      target: {
        innerText: "First Name",
      },
    });
    await screen.findByText(/Ronald/i);
    expect(screen.queryByText(/Bruno/i)).toBeNull();
    expect(screen.getByText(/Ronald/i)).toBeTruthy();
    expect(screen.getByText(/First name/i).className).toBe("sorted-des");

    fireEvent.click(screen.getByText(/First name/i), {
      target: {
        innerText: "First Name",
      },
    });
    await screen.findByText(/Bruno/i);
    expect(screen.getByText(/First name/i).className).toBe("sorted-asc");
  });

  it("it should display the fourth employee (Scott) after selecting four rows per page", async () => {
    render(<Table data={EMPLOYEES} possibleRows={[2, 3, 4, 5]} />);

    fireEvent.focus(screen.getByTestId(/Select/i));
    await screen.findByTestId(/Choice 3/i);
    fireEvent.mouseDown(screen.getByTestId(/Choice 3/), {
      target: { innerText: "4" },
    });
    fireEvent.blur(screen.getByTestId(/Select/i));
    await screen.findByText(/Scott/i);
    expect(screen.getByText(/Scott/i)).toBeTruthy();
  });

  it("it should change the page when clicking on a new page", async () => {
    render(<Table data={EMPLOYEES} possibleRows={[2, 3, 4, 5]} />);

    fireEvent.click(screen.getByTestId(/Page 2/i), {
      target: { innerText: "2" },
    });
    await screen.findByText("Showing 3/4 from 5 entries");
    expect(screen.getByText(/Scott/i)).toBeTruthy();
  });

  it("it should go back to first page after selecting new value for rows per page", async () => {
    render(<Table data={EMPLOYEES} possibleRows={[2, 3, 4, 5]} />);

    fireEvent.click(screen.getByTestId(/Page 2/i), {
      target: { innerText: "2" },
    });
    await screen.findByText("Showing 3/4 from 5 entries");
    expect(screen.getByText(/Scott/i)).toBeTruthy();

    fireEvent.focus(screen.getByTestId(/Select/i));
    await screen.findByTestId(/Choice 4/i);
    fireEvent.mouseDown(screen.getByTestId(/Choice 4/), {
      target: { innerText: "5" },
    });
    await screen.findByText("Showing 1/5 from 5 entries");
    expect(screen.getByText(/Bruno/i)).toBeTruthy();
  });

  it("it should hide rows options when select button is blurred", async () => {
    render(<Table data={EMPLOYEES} possibleRows={[2, 3, 4, 5]} />);

    fireEvent.focus(screen.getByTestId(/Select/i));
    await screen.findByTestId(/Choice 3/i);
    fireEvent.blur(screen.getByTestId(/Select/i));
    expect(screen.queryByTestId(/Choice 3/i)).toBeNull();
  });
});
