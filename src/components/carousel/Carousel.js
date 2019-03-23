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
    prevIndex: 0,
    currIndex: 0
  }

  /**
   * @param {Number} index - Page index to show
   */
  _showPage(index) {
    this._pages[index].removeAttribute(constants.attributes.DATA_HIDDEN)
  }

  /**
   * @param {Number} index - Page index to hide
   */
  _hidePage(index) {
    this._pages[index].setAttribute(constants.attributes.DATA_HIDDEN, 'true')
  }

  /**
   * @param {Number} action - Amount to navigate
   * @returns {Number} - Index to navigate to
   */
  _getNextPage(action) {
    let nextIndex = this._state.currIndex + action

    // Set nextIndex to last page
    if (nextIndex < 0) {
      nextIndex = this._pages.length - 1
    }

    // Set nextIndex to first page
    if (nextIndex > this._pages.length - 1) {
      nextIndex = 0
    }

    return nextIndex
  }

  /**
   * @param {Number} action - Amount to navigate
   */
  _navigate(action) {
    this._state.prevIndex = this._state.currIndex
    this._state.currIndex = this._getNextPage(action)

    this._hidePage(this._state.prevIndex)
    this._showPage(this._state.currIndex)
  }

  /**
   * @param {Event} e - Click event emitted by the button
   */
  _handleNavigation(e) {
    const { target } = e
    const direction = target.getAttribute(constants.attributes.DATA_DIRECTION)

    const action = direction === 'prev' ? -1 : 1
    this._navigate(action)

    e.preventDefault()
  }

  /**
   * Add all event listeners that are needed
   */
  _addEventListeners() {
    this._buttonPrev.addEventListener(
      'click',
      this._handleNavigation.bind(this)
    )
    this._buttonNext.addEventListener(
      'click',
      this._handleNavigation.bind(this)
    )
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
