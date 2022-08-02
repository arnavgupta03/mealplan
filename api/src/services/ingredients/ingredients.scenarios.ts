import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.IngredientCreateArgs>({
  ingredient: {
    one: { data: { name: 'String', quantity: 6746054 } },
    two: { data: { name: 'String', quantity: 8160131 } },
  },
})

export type StandardScenario = typeof standard
