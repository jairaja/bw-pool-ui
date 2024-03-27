import React from "react";
// import renderer, { TestRendererOptions } from "react-test-renderer";
import renderer from "react-test-renderer";
import { Provider as PaperProvider } from "react-native-paper";

import RootNavigator from "../rootNavigator";

describe("<RootNavigator />", () => {
  // it("has 1 child", () => {
  //   const tree = renderer
  //     .create(
  //       <PaperProvider>
  //         <RootNavigator />
  //       </PaperProvider>
  //     )
  //     .toTree();
  //   expect(tree?.children?.length).toBe(1);
  // });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
