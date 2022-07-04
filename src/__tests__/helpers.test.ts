import { describe, it, expect } from "vitest";
import { EMPLOYEES } from "../data/testData";
import { sortByKey } from "../utils/helpers";

describe("When using sortByKey function with EMPLOYEES table", () => {
  it("unsorted table should have Ronald first when not sorting", () => {
    expect(EMPLOYEES[0]["First Name"]).toBe("Ronald");
  });

  it("should have Bruno first when sorting by first name in asc order", () => {
    expect(sortByKey(EMPLOYEES, "First Name", "asc")[0]["First Name"]).toBe(
      "Bruno"
    );
  });

  it("should have Scott first when sorting by first name in des order", () => {
    expect(sortByKey(EMPLOYEES, "First Name", "des")[0]["First Name"]).toBe(
      "Scott"
    );
  });
});
