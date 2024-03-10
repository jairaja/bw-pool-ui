import React from "react";
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import iPostDataTableItem from "../models/iPostDataTableItem";

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
  const numberOfItemsPerPageList = [5, 10, 15, 20];
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
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

  return (
    <DataTable style={styles.dataGrid} onLayout={onLayout}>
      <DataTable.Header>
        {columnsDef.map((columnDef, index) => {
          return (
            <DataTable.Title
              key={index}
              numeric={columnDef.numeric ?? false}
              numberOfLines={columnDef.numberOfLines ?? 1}
              style={{
                ...{
                  minWidth:
                    index === 0 && firstColMinWidhtFifty ? "40%" : "auto",
                },
                ...styles.dataGridHeader,
              }}
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
                    flexDirection: "row",
                    minWidth:
                      colIndex === 0 && firstColMinWidhtFifty ? "43%" : "auto",
                  }}
                >
                  <Text
                    style={styles.dataGridRowText}
                    numberOfLines={0}
                    ellipsizeMode="tail"
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
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  dataGrid: {
    height: "100%",
  },
  dataGridHeader: {
    height: 80,
  },
  dataGridHeaderText: {
    flex: 1,
    flexWrap: "wrap",
  },
  dataGridRow: {
    height: 100,
  },
  dataGridRowText: {
    flexWrap: "wrap",
    height: "auto",
    width: "40%",
  },
});

export default DataGrid;
