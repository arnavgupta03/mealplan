import { render } from '@redwoodjs/testing/web'

import WeekPlanPage from './WeekPlanPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WeekPlanPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeekPlanPage />)
    }).not.toThrow()
  })
})
