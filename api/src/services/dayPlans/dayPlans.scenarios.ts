import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DayPlanCreateArgs>({
  dayPlan: { one: { data: { day: 7984562 } }, two: { data: { day: 7504794 } } },
})

export type StandardScenario = typeof standard
