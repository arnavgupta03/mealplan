import DatalistInput from 'react-datalist-input'
import type { FindDayPlanQuery, FindDayPlanQueryVariables } from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query FindDayPlanQuery($id: String!) {
    dayPlan: dayPlan(id: $id) {
      id
      day
      WeekPlan {
        recipes {
          id
          name
        }
      }
      meals {
        id
        name
        ingredients {
          id
          name
          quantity
        }
      }
    }
  }
`

export const UPDATE_FOOD_ITEM_DAY = gql`
  mutation UpdateFoodItemDayMutation(
    $id: String!
    $input: UpdateFoodItemInput!
  ) {
    updateFoodItem(id: $id, input: $input) {
      id
    }
  }
`

const CREATE_FOOD_ITEM_DAY = gql`
  mutation CreateFoodItemDayMutation($input: CreateFoodItemInput!) {
    createFoodItem(input: $input) {
      id
    }
  }
`

export const Loading = () => (
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
)

export const Empty = () => {
  return <div>Empty</div>
}

export const Failure = ({
  error,
}: CellFailureProps<FindDayPlanQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  dayPlan,
}: CellSuccessProps<FindDayPlanQuery, FindDayPlanQueryVariables>) => {
  const [updateFoodItemDay] = useMutation(UPDATE_FOOD_ITEM_DAY, {
    refetchQueries: [
      { query: QUERY }, // DocumentNode object parsed with gql
      'FindDayPlanQuery', // Query name
    ],
  })

  const [createFoodItemDay] = useMutation(CREATE_FOOD_ITEM_DAY, {
    onCompleted: async () => {
      toast.success('Meal Created', {
        duration: 2000,
      })
    },
    refetchQueries: [
      { query: QUERY }, // DocumentNode object parsed with gql
      'FindDayPlanQuery', // Query name
    ],
  })

  const onSelect = (item, dayId, mealId) => {
    console.log(item)
    console.log(dayId)
    // console.log({ variables: { id: mealId, input: { name: item.label } } })
    updateFoodItemDay({
      variables: { id: mealId, input: { name: item.label } },
    })
  }

  const onAddMeal = (dayPlanId) => {
    createFoodItemDay({
      variables: { input: { name: '', dayPlanId: dayPlanId } },
    })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h4 className="text-center">
          {
            {
              1: 'Monday',
              2: 'Tuesday',
              3: 'Wednesday',
              4: 'Thursday',
              5: 'Friday',
              6: 'Saturday',
              7: 'Sunday',
            }[dayPlan.day]
          }
        </h4>
      </div>
      {dayPlan.meals.map((meal, i) => {
        return (
          <div key={meal.id} id={meal.id} className="row my-5">
            <label htmlFor={meal.id}>
              {{ 0: 'Breakfast', 1: 'Lunch', 2: 'Dinner', 3: 'Dessert' }[i]}
            </label>
            <DatalistInput
              id={meal.id}
              items={dayPlan.WeekPlan.recipes.map((recipe) => {
                return { key: recipe.id, label: recipe.name }
              })}
              onSelect={(item) => onSelect(item, dayPlan.id, meal.id)}
              value={meal.name}
            />
          </div>
        )
      })}
      <div className="row">
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={() => onAddMeal(dayPlan.id)}
        >
          Add Meal
        </button>
      </div>
    </div>
  )
}
