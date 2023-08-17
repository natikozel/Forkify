<<<<<<< HEAD
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1
  },
  bookmarks: []
};

export const loadRecipe = async (id) => {

  const url = `${API_URL}/${id}?key=${KEY}`;
  const data = await AJAX(url);
  state.recipe = data.recipe;
  state.recipe = removeUnderScores(state.recipe);
  state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id);
};

const removeUnderScores = object => {
  const newObject = Object.assign({}, object);
  Object.keys(newObject).forEach(key => {
    if (key.includes('_')) {
      const nextLetter = key.at(key.indexOf('_') + 1);
      const newKey = key.replace('_' + nextLetter, nextLetter.toUpperCase());
      newObject[newKey] = newObject[key];
      delete newObject[key];
    }
  });
  return newObject;
};

export const loadSearchResults = async function(query, page = 1) {

  state.query = query;
  let data = await AJAX(`${API_URL}/?search=${query}&key=${KEY}`);
  data = data.recipes;
  state.search.recipes = data.map(ele => removeUnderScores(ele));
  state.search.page = page;

};

export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  const start = state.search.resultsPerPage * (page - 1);
  const end = state.search.resultsPerPage * page;

  return state.search.recipes.slice(start, end);
};

export function updateServings(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
}

export const addBookmark = function(recipe) {
  // Add bookmark

  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function(id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};


export const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage)
    state.bookmarks = JSON.parse(storage);
};

const clearBookmarks = function() {
  localStorage.clear();
};

export const uploadRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    let recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };

    let data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    data = removeUnderScores(data.recipe);
    state.recipe = data;
    addBookmark(state.recipe);

  } catch (err) {
    throw err;
  }
};


// clearBookmarks()
init();
=======
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1
  },
  bookmarks: []
};

export const loadRecipe = async (id) => {

  const url = `${API_URL}/${id}?key=${KEY}`;
  const data = await AJAX(url);
  state.recipe = data.recipe;
  state.recipe = removeUnderScores(state.recipe);
  state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id);
};

const removeUnderScores = object => {
  const newObject = Object.assign({}, object);
  Object.keys(newObject).forEach(key => {
    if (key.includes('_')) {
      const nextLetter = key.at(key.indexOf('_') + 1);
      const newKey = key.replace('_' + nextLetter, nextLetter.toUpperCase());
      newObject[newKey] = newObject[key];
      delete newObject[key];
    }
  });
  return newObject;
};

export const loadSearchResults = async function(query, page = 1) {

  state.query = query;
  let data = await AJAX(`${API_URL}/?search=${query}&key=${KEY}`);
  data = data.recipes;
  state.search.recipes = data.map(ele => removeUnderScores(ele));
  state.search.page = page;

};

export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  const start = state.search.resultsPerPage * (page - 1);
  const end = state.search.resultsPerPage * page;

  return state.search.recipes.slice(start, end);
};

export function updateServings(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
}

export const addBookmark = function(recipe) {
  // Add bookmark

  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function(id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};


export const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage)
    state.bookmarks = JSON.parse(storage);
};

const clearBookmarks = function() {
  localStorage.clear();
};

export const uploadRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    let recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };

    let data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    data = removeUnderScores(data.recipe);
    state.recipe = data;
    addBookmark(state.recipe);

  } catch (err) {
    throw err;
  }
};


// clearBookmarks()
init();
>>>>>>> main
