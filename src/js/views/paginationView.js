import 'core-js/stable';
import 'regenerator-runtime/runtime';
import View from './view.js';
import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');


  _generateMarkUp() {

    const numPages = Math.ceil(this._data.recipes.length / this._data.resultsPerPage);
    const curPage = this._data.page;
    if (numPages > 1) {
      if (curPage === 1) {
        return`
        <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage+1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`
      }
      if (curPage === numPages) {
        return `
         <button data-goto="${curPage-1}" class='btn--inline pagination__btn--prev'>
           <svg class='search__icon'>
             <use href='${icons}#icon-arrow-left'></use>
           </svg>
           <span>Page ${curPage-1}</span>
         </button>`;
      }
    }

    if (curPage < numPages) {
      return `
         <button data-goto="${curPage-1}" class='btn--inline pagination__btn--prev'>
           <svg class='search__icon'>
             <use href='${icons}#icon-arrow-left'></use>
           </svg>
           <span>Page ${curPage-1}</span>
         </button>
        <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage+1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`
    }

    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const nextPage = +btn.dataset.goto;
      handler(nextPage);
    })
  }
}

=======
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import View from './view.js';
import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');


  _generateMarkUp() {

    const numPages = Math.ceil(this._data.recipes.length / this._data.resultsPerPage);
    const curPage = this._data.page;
    if (numPages > 1) {
      if (curPage === 1) {
        return`
        <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage+1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`
      }
      if (curPage === numPages) {
        return `
         <button data-goto="${curPage-1}" class='btn--inline pagination__btn--prev'>
           <svg class='search__icon'>
             <use href='${icons}#icon-arrow-left'></use>
           </svg>
           <span>Page ${curPage-1}</span>
         </button>`;
      }
    }

    if (curPage < numPages) {
      return `
         <button data-goto="${curPage-1}" class='btn--inline pagination__btn--prev'>
           <svg class='search__icon'>
             <use href='${icons}#icon-arrow-left'></use>
           </svg>
           <span>Page ${curPage-1}</span>
         </button>
        <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage+1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`
    }

    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const nextPage = +btn.dataset.goto;
      handler(nextPage);
    })
  }
}

>>>>>>> main
