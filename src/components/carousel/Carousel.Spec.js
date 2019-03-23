import assert from 'assert'
import Carousel from './Carousel'

const defaultContext = {
  pages: ['page 0', 'page 1', 'page 2', 'page 3', 'page 4']
}

describe('Carousel', () => {
  describe('_getNextPage()', () => {
    it('should return next page if passed 1', () => {
      // Arrange
      const context = { _state: { currIndex: 1 }, _pages: defaultContext.pages }
      const action = 1
      const expectedResult = 2

      // Act
      const nextPage = Carousel.prototype._getNextPage.apply(context, [action])

      // Expect
      assert.strictEqual(nextPage, expectedResult)
    })

    it('should return previous page if passed -1', () => {
      // Arrange
      const context = { _state: { currIndex: 1 }, _pages: defaultContext.pages }
      const action = -1
      const expectedResult = 0

      // Act
      const nextPage = Carousel.prototype._getNextPage.apply(context, [action])

      // Expect
      assert.strictEqual(nextPage, expectedResult)
    })

    it('should return first page on last page and passed 1', () => {
      // Arrange
      const context = { _state: { currIndex: 4 }, _pages: defaultContext.pages }
      const action = 1
      const expectedResult = 0

      // Act
      const nextPage = Carousel.prototype._getNextPage.apply(context, [action])

      // Expect
      assert.strictEqual(nextPage, expectedResult)
    })

    it('should return last page on first page and passed -1', () => {
      // Arrange
      const context = { _state: { currIndex: 0 }, _pages: defaultContext.pages }
      const action = -1
      const expectedResult = 4

      // Act
      const nextPage = Carousel.prototype._getNextPage.apply(context, [action])

      // Expect
      assert.strictEqual(nextPage, expectedResult)
    })
  })
})
