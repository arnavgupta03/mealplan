export const schema = gql`
  type Ingredient {
    id: String!
    name: String!
    quantity: Int!
    FoodItem: FoodItem
    foodItemId: String
  }

  type Query {
    ingredients: [Ingredient!]! @requireAuth
    ingredient(id: String!): Ingredient @requireAuth
  }

  input CreateIngredientInput {
    name: String!
    quantity: Int!
    foodItemId: String
  }

  input UpdateIngredientInput {
    name: String
    quantity: Int
    foodItemId: String
  }

  type Mutation {
    createIngredient(input: CreateIngredientInput!): Ingredient! @requireAuth
    updateIngredient(id: String!, input: UpdateIngredientInput!): Ingredient!
      @requireAuth
    deleteIngredient(id: String!): Ingredient! @requireAuth
  }
`
