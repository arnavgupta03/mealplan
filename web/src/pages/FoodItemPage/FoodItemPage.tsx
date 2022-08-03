import ReactModal from 'react-modal'

import {
  Form,
  NumberField,
  Submit,
  TextField,
  FormError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import FoodItemCell, { QUERY } from 'src/components/FoodItemCell'
interface Props {
  id: string
}

const CREATE_INGREDIENT = gql`
  mutation CreateIngredientMutation($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      id
      name
      quantity
    }
  }
`

const FoodItemPage = ({ id }: Props) => {
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
    data.foodItemId = id
    console.log(data)
    const ingredientList = []
    for (const ing of ingredientList) {
      ingredientList.push(ing)
    }
    create({ variables: { input: data } })
      .then((newIngredient) => ingredientList.push(newIngredient.data))
      .then(() => setOpen(false))
  }

  return (
    <>
      <Toaster />
      <FoodItemCell id={id} />
      <div className="col-md-12 d-grid gap-2">
        <button
          type="button"
          className="btn btn-success btn-lg my-4 mx-2"
          onClick={handleOpenModal}
        >
          + Add Ingredient
        </button>
      </div>
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
    </>
  )
}

export default FoodItemPage
