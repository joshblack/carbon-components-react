import { getCellId } from './';

export const sortStates = {
  NONE: 'NONE',
  DESC: 'DESC',
  ASC: 'ASC',
};

export const initialSortState = sortStates.NONE;

export const getSortState = (key, header, prevState) => {
  if (key === header) {
    if (prevState === 'NONE') {
      return sortStates.DESC;
    }
    if (prevState === 'DESC') {
      return sortStates.ASC;
    }
    return sortStates.NONE;
  }
  return sortStates.DESC;
};

export const compareStrings = (a, b, locale) => {
  return a.localeCompare(b, locale, { numeric: true });
};

export const defaultSortRows = ({
  rowIds,
  cellsById,
  direction,
  key,
  locale,
}) =>
  rowIds.sort((a, b) => {
    const cellA = cellsById[getCellId(a, key)];
    const cellB = cellsById[getCellId(b, key)];
    if (direction === 'DESC') {
      return compareStrings(cellB.value, cellA.value, locale);
    }

    return compareStrings(cellA.value, cellB.value, locale);
  });
