import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
  // data represents the entire result set
  const [data, setData] = useState([]);
  // fields or columns in the data set
  const [filterAttributes, setFilterAttributes] = useState([]);
  // filterAttributes and associated values for which the data is to be filtered
  const [filters, setFilters] = useState({});
  // show/hide the layer presenting available filters
  const [filtersLayer, setFiltersLayer] = useState(false);
  // filteredResults are the subset of data which meets the filters criteria
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  // retains the previous filters values in case user does not want to apply
  // modified filters
  const [previousFilters, setPreviousFilters] = useState();
  // value entered into the search text input
  const [searchValue, setSearchValue] = useState('');

  const value = {
    data,
    setData,
    filterAttributes,
    setFilterAttributes,
    filters,
    setFilters,
    filtersLayer,
    setFiltersLayer,
    filteredResults,
    setFilteredResults,
    isFiltered,
    setIsFiltered,
    previousFilters,
    setPreviousFilters,
    searchValue,
    setSearchValue,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

const useFilters = () => {
  const context = useContext(FiltersContext);
  const {
    setFilters,
    setFilteredResults,
    setIsFiltered,
    searchValue,
  } = context;

  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }

  // Get value of multi-level key e.g "property.sub_property"
  const getKeyValue = (item, key) => {
    const keys = key.split(/\./);
    let value = item;
    let i;
    let len;

    for (i = 0, len = keys.length; i < len; i += 1) {
      const k = keys[i];
      value = value ? value[k] : null;
    }
    return value;
  };

  const getFilteredResults = (array, criteria, searchTerm) => {
    let filterResults;
    const filterKeys = Object.keys(criteria);

    filterResults = array.filter(item =>
      filterKeys.every(key => {
        const value = getKeyValue(item, key);
        if (criteria[key].func) {
          return criteria[key].func(value);
        }
        // also return items if the criteria key has no values selected
        if (criteria[key].length === 0) {
          return true;
        }
        return criteria[key].includes(value);
      }),
    );

    if (searchTerm) {
      filterResults = filterResults.filter(o =>
        Object.keys(o).some(
          k =>
            typeof o[k] === 'string' &&
            o[k].toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }

    return filterResults;
  };

  const applyFilters = (array, criteria, searchTerm) => {
    const filterResults = getFilteredResults(array, criteria, searchTerm);
    const filtersApplied = Object.keys(criteria)
      .map(key => criteria[key].length > 0)
      .includes(true);

    setFilters(criteria);
    setIsFiltered(!(array.length === filterResults.length) || filtersApplied);
    setFilteredResults(filterResults);
  };

  // Get available values for each field in the data set to
  // use as potential filtering options
  const getFilterOptions = (dataSet, field) => {
    const options = [];
    const parts = field.split('.');

    dataSet.forEach(datum => {
      const isFinalNode = parts.length === 1;
      if (!isFinalNode) {
        const value = getFilterOptions([datum[parts[0]]], parts[1])[0];
        if (value && !options.includes(value)) options.push(value);
      }
      return (
        datum[field] &&
        !options.includes(datum[field]) &&
        options.push(datum[field])
      );
    });

    return options;
  };

  return {
    ...context,
    applyFilters,
    getFilteredResults,
    getFilterOptions,
  };
};

FiltersProvider.propTypes = {
  children: PropTypes.node,
};

export { FiltersProvider, useFilters };
