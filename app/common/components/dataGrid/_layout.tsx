import React from "react";
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native";
import { Text } from "@/app/common/components/themed";

import { DataTable } from "react-native-paper";
import iPostDataTableItem from "../../../models/iPostDataTableItem";
import styles from "./dataGrid.style";
import {
  themePrimaryColorOverridden,
  useThemeColor,
} from "@/app/utils/themeHelper";

type DataGridHeaderProp = {
  sortDirection?: "ascending" | "descending";
  title: string;
  key: string;
  numeric?: boolean;
  numberOfLines?: number;
};

interface DataGridProps {
  items: iPostDataTableItem[];
  columnsDef: DataGridHeaderProp[];
  firstColMinWidhtFifty?: boolean;
  onRowPress?: (item: iPostDataTableItem) => void;
  onScroll?: (nativeEvent: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onLayout?: (nativeEvent: LayoutChangeEvent) => void;
}

const DataGrid = (props: DataGridProps) => {
  const [page, setPage] = React.useState<number>(0);
  const numberOfItemsPerPageList = [4, 8, 12, 16];
  // const numberOfItemsPerPageList = [5, 10, 15, 20];
  const [itemsPerPage, setItemsPerPage] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const {
    items,
    columnsDef,
    firstColMinWidhtFifty,
    onRowPress,
    onScroll,
    onLayout,
  } = props;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const calculatedStyle = function (index: number): StyleProp<ViewStyle> {
    return {
      ...styles.dataGridHeader,
      minWidth: index === 0 && firstColMinWidhtFifty ? "40%" : "auto",
    };
  };

  return (
    <DataTable style={styles.dataGrid} onLayout={onLayout}>
      <DataTable.Header>
        {columnsDef.map((columnDef, index) => {
          return (
            <DataTable.Title
              key={index}
              numeric={columnDef.numeric ?? false}
              numberOfLines={columnDef.numberOfLines ?? 1}
              style={calculatedStyle(index)}
            >
              <Text style={styles.dataGridHeaderText}>{columnDef.title}</Text>
            </DataTable.Title>
          );
        })}
      </DataTable.Header>
      <ScrollView onScroll={onScroll}>
        {items.slice(from, to).map((item, rowIndex) => (
          <DataTable.Row
            key={rowIndex}
            style={styles.dataGridRow}
            onPress={() => {
              if (onRowPress) {
                onRowPress(item);
              }
            }}
          >
            {columnsDef.map((columnDef, colIndex) => {
              return (
                <DataTable.Cell
                  key={colIndex}
                  numeric={columnDef.numeric ?? false}
                  style={{
                    // backgroundColor:'green',
                    // flexDirection: "row",
                    // justifyContent: "center",
                    // flex: 1,
                    minWidth:
                      colIndex === 0 && firstColMinWidhtFifty ? "43%" : "auto",
                  }}
                >
                  <Text
                    style={styles.dataGridRowText}
                    // numberOfLines={2}
                    // ellipsizeMode="tail"
                  >
                    {item[columnDef.key]}
                  </Text>
                </DataTable.Cell>
              );
            })}
          </DataTable.Row>
        ))}
      </ScrollView>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={<Text>{`${from + 1}-${to} of ${items.length}`}</Text>}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel={<Text>Rows per page</Text>}
        style={{ backgroundColor: useThemeColor("themedGray") }}
        theme={themePrimaryColorOverridden("text")}
      />
    </DataTable>
  );
};

export default DataGrid;
