import {
  dayPlans,
  dayPlan,
  createDayPlan,
  updateDayPlan,
  deleteDayPlan,
} from './dayPlans'
import type { StandardScenario } from './dayPlans.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('dayPlans', () => {
  scenario('returns all dayPlans', async (scenario: StandardScenario) => {
    const result = await dayPlans()

    expect(result.length).toEqual(Object.keys(scenario.dayPlan).length)
  })

  scenario('returns a single dayPlan', async (scenario: StandardScenario) => {
    const result = await dayPlan({ id: scenario.dayPlan.one.id })

    expect(result).toEqual(scenario.dayPlan.one)
  })

  scenario('creates a dayPlan', async () => {
    const result = await createDayPlan({
      input: { day: 6420076 },
    })

    expect(result.day).toEqual(6420076)
  })

  scenario('updates a dayPlan', async (scenario: StandardScenario) => {
    const original = await dayPlan({ id: scenario.dayPlan.one.id })
    const result = await updateDayPlan({
      id: original.id,
      input: { day: 3016000 },
    })

    expect(result.day).toEqual(3016000)
  })

  scenario('deletes a dayPlan', async (scenario: StandardScenario) => {
    const original = await deleteDayPlan({ id: scenario.dayPlan.one.id })
    const result = await dayPlan({ id: original.id })

    expect(result).toEqual(null)
  })
})
