export const schema = gql`
  type WeekPlan {
    id: String!
    name: String!
    recipes: [FoodItem]!
    days: [DayPlan]!
  }

  type Query {
    weekPlans: [WeekPlan!]! @requireAuth
    weekPlan(id: String!): WeekPlan @requireAuth
  }

  input CreateWeekPlanInput {
    name: String!
  }

  input UpdateWeekPlanInput {
    name: String
  }

  type Mutation {
    createWeekPlan(input: CreateWeekPlanInput!): WeekPlan! @requireAuth
    updateWeekPlan(id: String!, input: UpdateWeekPlanInput!): WeekPlan!
      @requireAuth
    deleteWeekPlan(id: String!): WeekPlan! @requireAuth
  }
`
