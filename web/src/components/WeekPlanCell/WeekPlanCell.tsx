import { useEffect, useState } from 'react'

import ReactModal from 'react-modal'
import type {
  FindWeekPlanQuery,
  FindWeekPlanQueryVariables,
} from 'types/graphql'

import { Form, Submit, TextField, FormError } from '@redwoodjs/forms'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import DayPlanCell from 'src/components/DayPlanCell'
// import { QUERY as DAYPLANQUERY } from 'src/components/DayPlanCell'
import FoodItemsCell from 'src/components/FoodItemsCell'
import { QUERY as FOODITEMSQUERY } from 'src/components/FoodItemsCell'

export const QUERY = gql`
  query FindWeekPlanQuery($id: String!) {
    weekPlan: weekPlan(id: $id) {
      id
      days {
        id
      }
    }
  }
`
const CREATE_FOOD_ITEM = gql`
  mutation CreateFoodItemMutation($input: CreateFoodItemInput!) {
    createFoodItem(input: $input) {
      id
      name
    }
  }
`

const CREATE_DAY_PLAN = gql`
  mutation CreateDayPlanMutation($input: CreateDayPlanInput!) {
    createDayPlan(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div>
    Something went wrong and this Week Plan doesn&apos;t exist, you might need
    to close and reopen your browser.
  </div>
)

export const Failure = ({
  error,
}: CellFailureProps<FindWeekPlanQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  weekPlan,
}: CellSuccessProps<FindWeekPlanQuery, FindWeekPlanQueryVariables>) => {
  const [foodItemModalOpen, setFoodItemModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  const [createDayPlans] = useMutation(CREATE_DAY_PLAN, {
    refetchQueries: [{ query: QUERY }, 'FindWeekPlanQuery'],
  })

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
    data.weekPlanId = weekPlan.id
    createFoodItem({ variables: { input: data } }).then(() =>
      setFoodItemModalOpen(false)
    )
  }

  const [daysCreated, setDaysCreated] = useState(weekPlan.days.length)

  const createEachDay = async (dayNum, weekId) => {
    console.log({ day: dayNum, weekPlanId: weekId })
    await createDayPlans({
      variables: { input: { day: dayNum, weekPlanId: weekId } },
    })
  }

  const createDays = async () => {
    for (const dayNum of [...Array(7).keys()]) {
      await createEachDay(dayNum + 1, weekPlan.id)
      setDaysCreated(daysCreated + 1)
    }
  }

  useEffect(() => {
    if (daysCreated === 0) {
      createDays()
    }
  })

  const onClickShare = () => {
    setShareModalOpen(true)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(location.href + 'week-plan/' + weekPlan.id)
    toast('Link Copied!')
  }

  return (
    <div className="container-fluid">
      <Toaster />
      <div className="row">
        <div className="col-md-8">
          <h1 className="my-3 mx-2">Week Plan</h1>
        </div>
        <div className="col-md-2 d-grid gap-2">
          <button type="button" className="btn btn-success btn-lg my-4 mx-2">
            Grocery List
          </button>
        </div>
        <div className="col-md-2 d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary btn-lg my-4 mx-2"
            onClick={onClickShare}
          >
            Share
          </button>
          <ReactModal isOpen={shareModalOpen} ariaHideApp={false}>
            <div className="container-fluid">
              <div className="row my-1">
                <label htmlFor="linktext">
                  Here&apos;s your shareable link!
                </label>
              </div>
              <div className="row my-2">
                <div className="col-md-10">
                  <input
                    id="linktext"
                    className="form-control form-control-lg"
                    type="text"
                    value={location.href + 'week-plan/' + weekPlan.id}
                    readOnly
                  />
                </div>
                <div className="col-md-2 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={copyLink}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="row mx-1">
                <button
                  type="button"
                  className="btn btn-secondary my-2"
                  onClick={() => setShareModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <h3 className="text-center">Recipes</h3>
          <div className="d-flex align-items-stretch">
            <ul className="m-auto list-group">
              <FoodItemsCell weekPlanId={weekPlan.id} />
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
        <div
          className="col-md-9 container-fluid border border-primary border-2 rounded-3 shadow"
          style={{ backgroundColor: '#f4f7ff' }}
        >
          <div className="row">
            {weekPlan.days.map((day) => {
              return (
                <div
                  key={day.id}
                  className="col m-1 py-3 px-2 rounded-2 shadow"
                >
                  <DayPlanCell id={day.id} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
