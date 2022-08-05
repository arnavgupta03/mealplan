export const schema = gql`
  type FoodItem {
    id: String!
    name: String!
    ingredients: [Ingredient]!
    DayPlan: DayPlan
    dayPlanId: String
    WeekPlan: WeekPlan
    weekPlanId: String
  }

  type Query {
    foodItems: [FoodItem!]! @requireAuth
    foodItem(id: String!): FoodItem @requireAuth
  }

  input CreateFoodItemInput {
    name: String!
    dayPlanId: String
    weekPlanId: String
  }

  input UpdateFoodItemInput {
    name: String
    dayPlanId: String
    weekPlanId: String
  }

  type Mutation {
    createFoodItem(input: CreateFoodItemInput!): FoodItem! @requireAuth
    updateFoodItem(id: String!, input: UpdateFoodItemInput!): FoodItem!
      @requireAuth
    deleteFoodItem(id: String!): FoodItem! @requireAuth
  }
`
