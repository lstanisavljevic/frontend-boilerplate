// Constants
const constants = {
  attributes: {
    DATA_PAGE: 'data-page',
    DATA_HIDDEN: 'data-hidden',
    DATA_BUTTON_PREV: 'data-button-prev',
    DATA_BUTTON_NEXT: 'data-button-next',
    DATA_DIRECTION: 'data-direction'
  }
}

/**
 * @module Carousel
 */
class Carousel {
  /**
   * @param {HTMLElement} element - The HTMLElement this module is constructed upon
   * @param {Object} options - ConditionerJS's merged options
   */
  constructor(element, options) {
    this._element = element
    this._options = options

    this._init()
  }

  _state = {
    currIndex: 0
  }

  /**
   * @param {Number} index - Index of page to show
   */
  _showPage(index) {
    this._pages[index].removeAttribute(constants.attributes.DATA_HIDDEN)
  }

  /**
   * @param {Number} index - Index of page to hide
   */
  _hidePage(index) {
    this._pages[index].setAttribute(constants.attributes.DATA_HIDDEN, 'true')
  }

  /**
   * @param {Number} index - index of page
   */
  _goToPage(index) {
    this._hidePage(this._state.currIndex)
    this._state.currIndex = index
    this._showPage(this._state.currIndex)
  }

  /**
   * @param {Event} e - Handle click event emitted by the prev button
   */
  _goToPrevPage(e) {
    let nextIndex = this._state.currIndex - 1
    // Set nextIndex to last page if required page is negative
    if (nextIndex < 0) {
      nextIndex = this._pages.length - 1
    }

    this._goToPage(nextIndex)
    e.preventDefault()
  }

  /**
   * @param {Event} e - Handle click event emitted by the next button
   */
  _goToNextPage(e) {
    let nextIndex = this._state.currIndex + 1
    // Set nextIndex to first page if exceeding amount of pages
    if (nextIndex > this._pages.length - 1) {
      nextIndex = 0
    }

    this._goToPage(nextIndex)
    e.preventDefault()
  }

  /**
   * Add all event listeners that are needed
   */
  _addEventListeners() {
    this._buttonPrev.addEventListener('click', this._goToPrevPage.bind(this))
    this._buttonNext.addEventListener('click', this._goToNextPage.bind(this))
  }

  /**
   * Set the defaults that are needed
   */
  _setDefaults() {
    this._pages.forEach((page, index) => {
      // Bail out if first page
      if (index === 0) {
        return
      }

      this._hidePage(index)
    })
  }

  /**
   * Cache all selectors that are needed
   */
  _cacheSelectors() {
    this._pages = Array.from(
      this._element.querySelectorAll(`[${constants.attributes.DATA_PAGE}]`)
    )
    this._buttonPrev = this._element.querySelector(
      `[${constants.attributes.DATA_BUTTON_PREV}]`
    )
    this._buttonNext = this._element.querySelector(
      `[${constants.attributes.DATA_BUTTON_NEXT}]`
    )
  }

  /**
   * Inititialize module
   */
  _init() {
    this._cacheSelectors()
    this._setDefaults()
    this._addEventListeners()
  }
}

export default Carousel
