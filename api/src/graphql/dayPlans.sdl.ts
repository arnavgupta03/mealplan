export const schema = gql`
  type DayPlan {
    id: String!
    day: Int!
    meals: [FoodItem]!
    WeekPlan: WeekPlan
    weekPlanId: String
  }

  type Query {
    dayPlans: [DayPlan!]! @requireAuth
    dayPlan(id: String!): DayPlan @requireAuth
  }

  input CreateDayPlanInput {
    day: Int!
    weekPlanId: String
  }

  input UpdateDayPlanInput {
    day: Int
    weekPlanId: String
  }

  type Mutation {
    createDayPlan(input: CreateDayPlanInput!): DayPlan! @requireAuth
    updateDayPlan(id: String!, input: UpdateDayPlanInput!): DayPlan!
      @requireAuth
    deleteDayPlan(id: String!): DayPlan! @requireAuth
  }
`
