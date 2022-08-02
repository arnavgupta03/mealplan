import { render } from '@redwoodjs/testing/web'

import FoodItemPage from './FoodItemPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FoodItemPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FoodItemPage />)
    }).not.toThrow()
  })
})
