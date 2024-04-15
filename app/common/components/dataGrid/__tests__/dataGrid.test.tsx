import React from "react";
import renderer from "react-test-renderer";
import DataGrid from "../_layout";

describe("DataGrid", () => {
  // const items = [
  //   { id: 1, name: "John Doe", age: 25 },
  //   { id: 2, name: "Jane Smith", age: 30 },
  // ];

  // const columnsDef = [
  //   { title: "ID", key: "id", numeric: true },
  //   { title: "Name", key: "name" },
  //   { title: "Age", key: "age", numeric: true },
  // ];

  it(`renders correctly`, () => {
    const tree = renderer
      .create(<DataGrid items={[]} columnsDef={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // it("renders the data grid with correct items and columns", () => {
  //   const { getByText } = renderer.create(
  //     <DataGrid items={items} columnsDef={columnsDef} />
  //   ).toJSON;

  //   expect(getByText("John Doe")).toBeTruthy();
  //   expect(getByText("Jane Smith")).toBeTruthy();
  //   expect(getByText("ID")).toBeTruthy();
  //   expect(getByText("Name")).toBeTruthy();
  //   expect(getByText("Age")).toBeTruthy();
  // });
});

// describe("DataGrid", () => {

//   // Add more test cases as needed
// });
