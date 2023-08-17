
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = "Recipe was successfully uploaded"

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape')
        this.toggleWindow();
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault()
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    })
  }
}


export default new AddRecipeView();
=======
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = "Recipe was successfully uploaded"

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape')
        this.toggleWindow();
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault()
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    })
  }
}


export default new AddRecipeView();

