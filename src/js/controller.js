import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';


// if (module.hot)
// module.hot.accept();


const controlRecipes = async function() {

  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(recipe);

  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    const query = searchView.query();
    if (!query) throw 'invalid';
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderErrorMessage();
  }
};

const controlServings = function(newServings) {
  try {
    model.updateServings(newServings);
    recipeView.update(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlPages = function(nextPage) {
  try {
    resultsView.render(model.getSearchResultsPage(nextPage));
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderErrorMessage();
  }
};

const controlAddBookmark = function() {
  if (!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else model.deleteBookmark
  (model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
  }
};

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  paginationView.addHandlerClick(controlPages);
  newFeature();
};

const newFeature = function() {
  console.log("Welcome to the application");
}

init();