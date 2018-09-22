export function searchItems(state, data) {
  const { searchText, searchParam } = state;

  return data.items.filter(item => {
    const itemFormated = item[searchParam].toLowerCase();
    return itemFormated.includes(searchText.toLowerCase());
  });
}

export function filterItems(state, data) {
  const { selectedFilters, filterType } = state;
  const filteredItems = data.items.filter(item => selectedFilters.includes(item[filterType]));

  return filteredItems.length > 0 ? filteredItems : data.items;
}

export function getPagedItems(state) {
  const { items, currentPage, itemsPerPage } = state;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  return [...items.slice(firstItemIndex, lastItemIndex)];
}

export function scrollToPosition(position) {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > position) {
    window.requestAnimationFrame(() => scrollToPosition(position));
    window.scrollTo(0, c - c / 8);
  }
}

export function getExcerpt(text, length) {
  return text.length > length ? `${text.substring(0, length - 3)}...` : text;
}
