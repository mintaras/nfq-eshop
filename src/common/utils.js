export function searchFilterItems(state) {
  const { data, searchText, searchParam, selectedFilters, filterType } = state;

  if (searchText === '') {
    if (selectedFilters.length > 0) {
      return filterItems(data.items, selectedFilters, filterType);
    }

    return data.items;
  } else {
    if (selectedFilters.length > 0) {
      const filteredItems = filterItems(data.items, selectedFilters, filterType);

      return searchItems(filteredItems, searchParam, searchText);
    }

    return searchItems(data.items, searchParam, searchText);
  }
}

function searchItems(items, searchParam, searchText) {
  return items.filter(item => {
    const itemFormated = item[searchParam].toLowerCase();

    return itemFormated.includes(searchText.toLowerCase());
  });
}

function filterItems(items, selectedFilters, filterType) {
  return items.filter(item => selectedFilters.includes(item[filterType]));
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
