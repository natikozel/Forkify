import icons from 'url:../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Fraction } from 'fractional';
import * as model from '../model';

export default class View {

  _data;

  render(data, render = true) {

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();


    this._data = data;
    const markup = this._generateMarkUp();

    if (!render) return markup;

    this._clearAndRender(markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markUp =
      `<div class='spinner'>
    <svg>
    <use href='${icons}#icon-loader'></use>
    </svg>
    </div>`;
    this._clearAndRender(markUp);
  };

  renderErrorMessage(message = this._errorMessage) {
    const markUp = `
        <div class='message'>
          <div>
            <svg>
              <use href='${icons}#icon-alert-triangle'></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clearAndRender(markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
        <div class='message'>
          <div>
            <svg>
              <use href='${icons}#icon-smile'></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clearAndRender(markUp);
  }


  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkUp();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clearAndRender(markUp) {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}