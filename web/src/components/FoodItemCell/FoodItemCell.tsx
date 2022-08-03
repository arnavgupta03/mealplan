import type {
  FindFoodItemQuery,
  FindFoodItemQueryVariables,
} from 'types/graphql'

import { MetaTags, useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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

const DELETE_INGREDIENT = gql`
  mutation DeleteIngredientMutation($id: String!) {
    deleteIngredient(id: $id) {
      id
      name
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

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
  const [delIng] = useMutation(DELETE_INGREDIENT, {
    onCompleted: async () => {
      toast.success('Ingredient deleted for ' + foodItem.name, {
        duration: 2000,
      })
    },
    refetchQueries: [
      { query: QUERY }, // DocumentNode object parsed with gql
      'FindFoodItemQuery', // Query name
    ],
  })

  const handleDelete = (ingId) => {
    delIng({ variables: { id: ingId } })
  }

  return (
    <div className="container-fluid">
      <MetaTags title={foodItem.name} description="FoodItem page" />
      <div className="row">
        <div className="col-md-12">
          <h1 className="my-3 mx-2">{foodItem.name}</h1>
        </div>
      </div>
      <div className="row mx-1 my-2">
        <ul className="list-group list-group-flush">
          {foodItem.ingredients.map((ingredient) => {
            return (
              <li
                key={ingredient.id}
                className="list-group-item lead d-flex justify-content-between"
              >
                {ingredient.quantity + ' x ' + ingredient.name}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(ingredient.id)}
                >
                  Delete
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
