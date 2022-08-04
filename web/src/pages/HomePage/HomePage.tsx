import { useState } from 'react'

import ReactModal from 'react-modal'

import { Form, Submit, TextField, FormError } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import FoodItemsCell from 'src/components/FoodItemsCell'
import { QUERY as FOODITEMSQUERY } from 'src/components/FoodItemsCell'

const CREATE_FOOD_ITEM = gql`
  mutation CreateFoodItemMutation($input: CreateFoodItemInput!) {
    createFoodItem(input: $input) {
      id
      name
    }
  }
`

const HomePage = () => {
  const [foodItemModalOpen, setFoodItemModalOpen] = useState(false)

  const [createFoodItem, { loading, error }] = useMutation(CREATE_FOOD_ITEM, {
    onCompleted: async () => {
      toast.success('New Recipe Created', {
        duration: 2000,
      })
    },
    refetchQueries: [{ query: FOODITEMSQUERY }, 'FoodItemsQuery'],
  })

  const handleFoodItemOpenModal = () => {
    setFoodItemModalOpen(true)
  }

  const handleFoodItemCloseModal = () => {
    setFoodItemModalOpen(false)
  }

  const onFoodItemSubmit = (data) => {
    console.log(data)
    createFoodItem({ variables: { input: data } }).then(() =>
      setFoodItemModalOpen(false)
    )
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Toaster />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <h1 className="my-3 mx-2">Week Plan</h1>
          </div>
          <div className="col-md-2 d-grid gap-2">
            <button type="button" className="btn btn-success btn-lg my-4 mx-2">
              Grocery List
            </button>
          </div>
          <div className="col-md  -2 d-grid gap-2">
            <button type="button" className="btn btn-primary btn-lg my-4 mx-2">
              Share
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <h3 className="text-center">Recipes</h3>
            <div className="d-flex align-items-stretch">
              <ul className="m-auto list-group">
                <FoodItemsCell />
                <li className="list-group-item">
                  <button
                    type="button"
                    className="btn btn-info m-auto"
                    onClick={handleFoodItemOpenModal}
                  >
                    Create New Item
                  </button>
                </li>
              </ul>
            </div>
            <ReactModal isOpen={foodItemModalOpen} ariaHideApp={false}>
              <Form
                className="my-3 container-fluid"
                onSubmit={onFoodItemSubmit}
                error={error}
              >
                <FormError error={error} wrapperClassName="form-error" />
                <label htmlFor="name" className="form-label">
                  What&apos;s your recipe called?
                </label>
                <TextField
                  className="row mb-3 form-control"
                  name="name"
                  validation={{ required: true }}
                />

                <div className="row">
                  <Submit className="btn btn-success my-2" disabled={loading}>
                    Add Recipe
                  </Submit>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleFoodItemCloseModal}
                  >
                    Close
                  </button>
                </div>
              </Form>
            </ReactModal>
          </div>
          <div className="col-md-10">
            <div className="container-fluid"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
