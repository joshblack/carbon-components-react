export const toggleSortDirection = direction => {
  if (direction === 'DESC') {
    return 'ASC';
  }

  return 'DESC';
};

export const sortRow = (key, direction, locale = 'en') => (a, b) => {
  if (direction === 'DESC') {
    return a[key].localeCompare(b[key], locale, { numeric: true });
  }

  return b[key].localeCompare(a[key], locale, { numeric: true });
};
