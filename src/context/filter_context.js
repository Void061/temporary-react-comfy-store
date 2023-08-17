import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  // Partiamo col default price-lowest, matcheranno con i nominativi nel form
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // Prendiamo i prodotti dal context dei prodotti
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // I prodotti saranno vuoti all'inizio, una volta caricati verrà triggerato
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  // Ogni volta che products, sort, filters cambiano
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // Prendo il nome e il valore dell'elemento html che ha azionato la funzione (e)
  // Nel nostro caso, i sort sono in Sort.js
  const updateSort = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  // Update dei filtri con inputs controllati in Filters.js
  // Name è importante, riprenderà il nome dell'elemento che invoca la funzione
  // Il nome è strettamente collegato all'oggetto sopra filters, text, colors, etc...
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // Category è un bottone, non ha l'attributo value
    // Quindi accediamo all'innerHTML, textContent in js
    if (name === "category") {
      value = e.target.textContent;
    }
    // Stessa cosa delle categorie, ma utilizziamo gli attributi data
    // Per un approccio differente
    if (name === "color") {
      value = e.target.dataset.color;
    }
    // Per il prezzo, lo convertiamo forzatamente in number, per evitare imbrogli js
    if (name === "price") {
      value = Number(value);
    }

    // Per le checkbox
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
