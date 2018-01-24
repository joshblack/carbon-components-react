import { getCellId } from './';

// `normalize` is a helper to generate flat objects from a nested
// multi-dimensional array
export const normalize = (rows, headers, isSelectable) => {
  const rowIds = new Array(rows.length);
  const rowsById = {};
  const cellsById = {};

  rows.forEach((row, i) => {
    rowIds[i] = row.id;
    // Initialize the row info and state values, namely for selection and
    // expansion
    rowsById[row.id] = {
      id: row.id,
      isSelectable,
      isSelected: false,
      isExpandable: null,
      isExpanded: false,
      cells: new Array(headers.length),
    };

    headers.forEach(({ key }, i) => {
      const id = getCellId(row.id, key);
      // Initialize the cell info and state values, namely for editing
      cellsById[id] = {
        id,
        value: row[key],
        isEditable: false,
        isEditing: false,
        isValid: true,
        errors: null,
      };

      rowsById[row.id].cells[i] = id;
    });
  });

  return {
    rowIds,
    rowsById,
    cellsById,
  };
};

export const denormalize = (rowIds, rowsById, cellsById) => {
  return rowIds.map(id => ({
    ...rowsById[id],
    cells: rowsById[id].cells.map(cellId => cellsById[cellId]),
  }));
};
