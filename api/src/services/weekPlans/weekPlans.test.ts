import {
  weekPlans,
  weekPlan,
  createWeekPlan,
  updateWeekPlan,
  deleteWeekPlan,
} from './weekPlans'
import type { StandardScenario } from './weekPlans.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('weekPlans', () => {
  scenario('returns all weekPlans', async (scenario: StandardScenario) => {
    const result = await weekPlans()

    expect(result.length).toEqual(Object.keys(scenario.weekPlan).length)
  })

  scenario('returns a single weekPlan', async (scenario: StandardScenario) => {
    const result = await weekPlan({ id: scenario.weekPlan.one.id })

    expect(result).toEqual(scenario.weekPlan.one)
  })

  scenario('creates a weekPlan', async () => {
    const result = await createWeekPlan({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a weekPlan', async (scenario: StandardScenario) => {
    const original = await weekPlan({ id: scenario.weekPlan.one.id })
    const result = await updateWeekPlan({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a weekPlan', async (scenario: StandardScenario) => {
    const original = await deleteWeekPlan({ id: scenario.weekPlan.one.id })
    const result = await weekPlan({ id: original.id })

    expect(result).toEqual(null)
  })
})
