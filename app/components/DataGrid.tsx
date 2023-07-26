import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import iPostDataTableItem from "../models/iPostDataTableItem";

type IDataGridHeader = {
  sortDirection?: "ascending" | "descending";
  title: string;
  key: string;
  numeric?: boolean;
  numberOfLines?: number;
};

interface IDataGridProps {
  items: iPostDataTableItem[];
  columnsDef: IDataGridHeader[];
  firstColMinWidhtFifty?: boolean;
}

const DataGrid = (props: IDataGridProps) => {
  const [page, setPage] = React.useState<number>(0);
  const numberOfItemsPerPageList = [5, 10, 15, 20];
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const items = props.items;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={{ height: "100%" }}>
      <DataTable.Header>
        {props.columnsDef.map((columnDef, index) => {
          return (
            <DataTable.Title
              key={index}
              numeric={columnDef.numeric ?? false}
              numberOfLines={columnDef.numberOfLines ?? 1}
              style={{
                minWidth:
                  index === 0 && props.firstColMinWidhtFifty ? "50%" : "auto",
              }}
            >
              {columnDef.title}
            </DataTable.Title>
          );
        })}
      </DataTable.Header>
      <ScrollView>
        {items.slice(from, to).map((item, rowIndex) => (
          <DataTable.Row
            key={rowIndex}
            onPress={() => {
              console.log("8888888888888 " + JSON.stringify(item));
            }}
          >
            {props.columnsDef.map((columnDef, colIndex) => {
              return (
                <DataTable.Cell
                  key={colIndex}
                  numeric={columnDef.numeric ?? false}
                  style={{
                    minWidth:
                      colIndex === 0 && props.firstColMinWidhtFifty
                        ? "50%"
                        : "auto",
                  }}
                >
                  {item[columnDef.key]}
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

export default DataGrid;
