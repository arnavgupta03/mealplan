import ReactModal from 'react-modal'
import type {
  FindFoodItemQuery,
  FindFoodItemQueryVariables,
} from 'types/graphql'

import {
  Form,
  NumberField,
  Submit,
  TextField,
  FormError,
} from '@redwoodjs/forms'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { MetaTags, useMutation } from '@redwoodjs/web'
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

export const CREATE_INGREDIENT = gql`
  mutation CreateIngredientMutation($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      id
      name
      quantity
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
  const [modalIsOpen, setOpen] = React.useState(false)

  const [create, { loading, error }] = useMutation(CREATE_INGREDIENT, {
    onCompleted: async () => {
      toast.success('New Ingredient Created', {
        duration: 2000,
      })
    },
    refetchQueries: [
      { query: QUERY }, // DocumentNode object parsed with gql
      'FindFoodItemQuery', // Query name
    ],
  })

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onSubmit = (data) => {
    data.foodItemId = foodItem.id
    console.log(data)
    const ingredientList = []
    for (const ing of ingredientList) {
      ingredientList.push(ing)
    }
    create({ variables: { input: data } })
      .then((newIngredient) => ingredientList.push(newIngredient.data))
      .then(() => setOpen(false))
  }

  const [delIng] = useMutation(DELETE_INGREDIENT, {
    onCompleted: async () => {
      toast.success('Ingredient deleted for ' + foodItem.name, {
        duration: 2000,
      })
    },
    refetchQueries: [{ query: QUERY }, 'FindFoodItemQuery'],
  })

  const handleDelete = (ingId) => {
    delIng({ variables: { id: ingId } })
  }

  return (
    <div className="container-fluid">
      <MetaTags title={foodItem.name} description="FoodItem page" />
      <div className="row">
        <div className="col-md-9">
          <h1 className="my-3 mx-2">{foodItem.name}</h1>
        </div>
        <div className="col-md-3 d-grid gap-2">
          <button
            type="button"
            className="btn btn-success btn-lg my-4 mx-2"
            onClick={handleOpenModal}
          >
            + Add Ingredient
          </button>
        </div>
      </div>
      <div className="row mx-1 my-2">
        <ReactModal isOpen={modalIsOpen} ariaHideApp={false}>
          <Form
            className="my-3 container-fluid"
            onSubmit={onSubmit}
            error={error}
          >
            <FormError error={error} wrapperClassName="form-error" />
            <label htmlFor="name" className="form-label">
              Ingredient Name
            </label>
            <TextField
              className="row mb-3 form-control"
              name="name"
              validation={{ required: true }}
            />

            <label htmlFor="quantity" className="form-label">
              Ingredient Quantity
            </label>
            <NumberField
              className="row mb-3 form-control"
              name="quantity"
              validation={{ required: true }}
            />
            <div className="row">
              <Submit className="btn btn-success my-2" disabled={loading}>
                Add Ingredient
              </Submit>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </Form>
        </ReactModal>
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
