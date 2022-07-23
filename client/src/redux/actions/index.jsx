import axios from "axios";
import {
  ALL_API, ALL_ID, ALL_NAME, GET_BEERS, GET_BEER_DETAIL, REMOVE_DETAIL, SEARCH_BAR, 
  POST_BEER, POST_USER, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, ADD_TO_CART, GET_CART, TOTAL_PRICE, CHECKOUT_BEERS,
} from "../const";

export function addToCart(id) {
  return { 
    type: ADD_TO_CART, 
    payload: id 
  };
};

export function removeAllFromCart() {
  return { 
    type: REMOVE_ALL_FROM_CART 
  };
};

export function removeOneFromCart(id) {
  console.log(id);
  return { 
    type: REMOVE_ONE_FROM_CART, 
    payload: id 
  };
};

export function getCart() {
  return { type: GET_CART };
};

export function totalPrice(payload) {
  return { type: TOTAL_PRICE, payload };
};

export function infoBeers(payload) {
  return { type: CHECKOUT_BEERS, payload };
};

export function getAllBeers() {
  return async function (dispatch) {
    var allBeers = await axios.get(ALL_API);
    return dispatch({
      type: GET_BEERS,
      payload: allBeers.data,
    });
  };
};

export function getBeerDetail(id) {
  return async function (dispatch) {
    const beerById = await axios.get(ALL_ID + id);
    return dispatch({
      type: GET_BEER_DETAIL,
      payload: beerById.data,
    });
  };
};

export const removeDetail = () => {
  return {
    type: REMOVE_DETAIL,
  };
};

export function searchBar(payload) {
  return async function (dispatch) {
    try {
      const search = await axios.get(ALL_NAME + payload);
      return dispatch({
        type: SEARCH_BAR,
        payload: search.data
      })
    } catch (error) {
      if (error.response) {
        alert(error.response.data)
      }
    }
  }
};

export function postBeer(payload) {
  return async function (dispatch) {
    try {
      const post = await axios.post(POST_BEER, payload);
      return post;
    } catch (error) {
      if (error.response) {
        return alert(error.response.data)
      }
    }
  }
};

export function postUser(payload) {
  return async function (dispatch) {
    try {
      const post = await axios.post(POST_USER, payload);
      return post;
    } catch (error) {
      if (error.response) {
        return alert(error.response.data)
      }
    }
  }
};