import {
  foodItems,
  foodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} from './foodItems'
import type { StandardScenario } from './foodItems.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('foodItems', () => {
  scenario('returns all foodItems', async (scenario: StandardScenario) => {
    const result = await foodItems()

    expect(result.length).toEqual(Object.keys(scenario.foodItem).length)
  })

  scenario('returns a single foodItem', async (scenario: StandardScenario) => {
    const result = await foodItem({ id: scenario.foodItem.one.id })

    expect(result).toEqual(scenario.foodItem.one)
  })

  scenario('creates a foodItem', async () => {
    const result = await createFoodItem({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a foodItem', async (scenario: StandardScenario) => {
    const original = await foodItem({ id: scenario.foodItem.one.id })
    const result = await updateFoodItem({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a foodItem', async (scenario: StandardScenario) => {
    const original = await deleteFoodItem({ id: scenario.foodItem.one.id })
    const result = await foodItem({ id: original.id })

    expect(result).toEqual(null)
  })
})
