export function searchItems(state) {
    const { data, searchText, searchParam } = state;

    return data.items.filter((item) => {
        return item[searchParam].toLowerCase().includes(searchText.toLowerCase())
    });
}

export function filterItems(state) {
    const { selectedFilters, filterType, data } = state;
    const filteredItems = data.items.filter((item) => selectedFilters.includes(item[filterType]));

    return filteredItems.length > 0 ? filteredItems : data.items;
}

export function getPagedItems(state) {
  const { items, currentPage, itemsPerPage } = state;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  return [...items.slice(firstItemIndex, lastItemIndex)];
}
