import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import iPostDataTableItem from "../models/iPostDataTableItem";

interface IDataGridProps {
  items: iPostDataTableItem[];
  sortDirection: string;
}

export default DataGrid = (props: IDataGridProps) => {
  return (
    <DataTable style={{ height: "100%" }}>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title
          numeric
          // sortDirection="ascending"
        >
          Fat
        </DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>
              <>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{"\n"}</Text>
                <Text style={styles.text}>{item.name}</Text>
              </>
            </DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
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
