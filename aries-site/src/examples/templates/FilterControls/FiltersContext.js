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
  // any valid Layer props
  const [layerProps, setLayerProps] = useState({ position: 'right' });
  // retains the previous filters values in case user does not want to apply
  // modified filters
  const [previousFilters, setPreviousFilters] = useState();
  // attribute that uniquely identifies a record in the data
  const [primaryKey, setPrimaryKey] = useState([]);
  // value entered into the search text input
  const [searchValue, setSearchValue] = useState('');
  // array of primaryKeys for filteredResults that have been selected
  const [selected, setSelected] = useState([]);
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
    layerProps,
    setLayerProps,
    previousFilters,
    setPreviousFilters,
    primaryKey,
    setPrimaryKey,
    searchValue,
    setSearchValue,
    selected,
    setSelected,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

const useFilters = () => {
  const context = useContext(FiltersContext);
  const {
    data,
    filteredResults,
    setFilteredResults,
    filters,
    setFilters,
    filtersLayer,
    primaryKey,
    setIsFiltered,
    searchValue,
    selected,
    setSelected,
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

  // Recursively extract all text values from the json object and return
  // a concatenated string.
  const getTextFromJson = json => {
    const obj = {};

    if (json === null || json === undefined) {
      return '';
    }

    if (typeof json === 'string') {
      return json;
    }

    Object.keys(json).forEach(key => (obj[key] = getTextFromJson(json[key])));
    return Object.values(obj).join(' ');
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
      const searchString = searchTerm.toLowerCase();
      filterResults = filterResults.filter(
        item =>
          getTextFromJson(item)
            .toLowerCase()
            .indexOf(searchString) > -1,
      );
    }

    return filterResults;
  };

  const getIntersection = (array1, array2) => {
    const results = [];
    array1.forEach(i => {
      let inBoth;
      array2.forEach(j => {
        if (i === j[primaryKey]) inBoth = true;
      });
      if (inBoth) results.push(i);
    });
    return results;
  };

  const applyFilters = (array, criteria, searchTerm) => {
    const filterResults = getFilteredResults(array, criteria, searchTerm);
    const filtersApplied = Object.keys(criteria)
      .map(key => criteria[key].length > 0)
      .includes(true);

    setFilters(criteria);
    setIsFiltered(
      !(array.length === filterResults.length) ||
        filtersApplied ||
        (searchTerm && searchTerm.length > 0),
    );
    setFilteredResults(filterResults);

    // selected results should only include selections that still exist
    // in the filterResults
    setSelected(getIntersection(selected, filterResults));
  };

  // Get available values for each field in the data set to
  // use as potential filtering options
  const getFilterOptions = (dataSet, field) => {
    const options = [];
    const parts = field.split('.');

    dataSet.forEach(datum => {
      const isFinalNode = parts.length === 1;
      if (!isFinalNode) {
        const nextField = parts.slice(1, parts.length).join('.');
        const value = getFilterOptions([datum[parts[0]]], nextField)[0];
        // in cases where data is boolean, we want false to be included
        if ((value || value === false) && !options.includes(value))
          options.push(value);
      }
      return (
        (datum[field] || datum[field] === false) &&
        !options.includes(datum[field]) &&
        options.push(datum[field])
      );
    });

    return options;
  };

  // keep filteredResults up to date as parent data set may change
  const syncFilteredResults = () => {
    if (
      filteredResults.length === 0 &&
      Object.keys(filters).length === 0 &&
      searchValue.length === 0
    )
      setFilteredResults(data);
    // If data set changes, reapply filters. However, if the filters layer is
    // open, don't automatically apply; instead, let user use the layer controls
    // to set filtered results
    else if (!filtersLayer) {
      const nextResults = getFilteredResults(data, filters, searchValue);
      if (JSON.stringify(nextResults) !== JSON.stringify(filteredResults))
        setFilteredResults(nextResults);
    }
  };

  return {
    ...context,
    applyFilters,
    getFilteredResults,
    getFilterOptions,
    syncFilteredResults,
  };
};

FiltersProvider.propTypes = {
  children: PropTypes.node,
};

export { FiltersProvider, useFilters };
