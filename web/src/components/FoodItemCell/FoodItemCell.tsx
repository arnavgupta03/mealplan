import type {
  FindFoodItemQuery,
  FindFoodItemQueryVariables,
} from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindFoodItemQuery($id: String!) {
    foodItem: foodItem(id: $id) {
      id
      name
      ingredients {
        id
        name
        quantity
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Food Item at this page</div>

export const Failure = ({
  error,
}: CellFailureProps<FindFoodItemQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  foodItem,
}: CellSuccessProps<FindFoodItemQuery, FindFoodItemQueryVariables>) => {
  return (
    <div className="container-fluid">
      <MetaTags title={foodItem.name} description="FoodItem page" />
      <div className="row">
        <div className="col-md-9">
          <h1 className="my-3 mx-2">{foodItem.name}</h1>
        </div>
        <div className="col-md-3 d-grid gap-2">
          <button type="button" className="btn btn-success btn-lg my-4 mx-2">
            + Add Ingredient
          </button>
        </div>
      </div>
      <div className="row mx-1 my-2">
        <ul className="list-group list-group-flush">
          {foodItem.ingredients.map((ingredient) => {
            return (
              <li key={ingredient.id} className="list-group-item lead">
                {ingredient.quantity + ' x ' + ingredient.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
