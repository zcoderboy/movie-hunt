import React from 'react';
import supabase from '../lib/supabaseClient';
import { useReducer } from 'react';

const DEFAULT_TYPE = 'SEARCH';

export const SearchContext = React.createContext();

const searchReducer = (state, action) => {
  if (action.type === DEFAULT_TYPE) {
    state = [...action.payload];
  }
  return state;
};

export const SearchProvider = ({ children }) => {
  const [result, dispatch] = useReducer(searchReducer, []);

  async function doSearch(query) {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify(query)
    });
    const data = await response.json();
    dispatch({
      type: DEFAULT_TYPE,
      payload: data
    });
    return data;
  }

  return <SearchContext.Provider value={{ doSearch, result }}>{children}</SearchContext.Provider>;
};
