import { useEffect, useState } from 'react'

import type {
  FindWeekPlanQuery,
  FindWeekPlanQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindGroceryListQuery($id: String!) {
    weekPlan: weekPlan(id: $id) {
      id
      recipes {
        id
        name
        ingredients {
          id
          name
          quantity
        }
      }
      days {
        id
        meals {
          id
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindWeekPlanQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  weekPlan,
}: CellSuccessProps<FindWeekPlanQuery, FindWeekPlanQueryVariables>) => {
  const [listBaseIngredients, setListBaseIngredients] = useState([])
  const [listIngredients, setListIngredients] = useState([])
  // const [canGetQuants, setCanGetQuants] = useState(false)

  useEffect(() => {
    // console.log(weekPlan)

    const getMeals = async () => {
      const arr = []
      for (const day of weekPlan.days)
        for (const meal of day.meals) arr.push(meal)
      return arr
    }

    const getIngs = async (mealList) => {
      for (const recipe of weekPlan.recipes) {
        for (const ingredient of recipe.ingredients) {
          if (!listBaseIngredients.includes(ingredient.name)) {
            setListBaseIngredients(listBaseIngredients.concat(ingredient.name))
            setListIngredients(
              listIngredients.concat({
                name: ingredient.name,
                quantity:
                  ingredient.quantity *
                  mealList.filter((obj) => {
                    if (obj.name === recipe.name) {
                      return true
                    }
                    return false
                  }).length,
              })
            )
          }
        }
      }
    }

    // const getQuants = async () => {
    //   console.log(listIngredients)
    //   for (const day of weekPlan.days) {
    //     for (const meal of day.meals) {
    //       for (const recipe of weekPlan.recipes) {
    //         if (meal.name === recipe.name) {
    //           for (const ing of recipe.ingredients) {
    //             if (
    //               listIngredients[listBaseIngredients.indexOf(ing.name)] !==
    //               undefined
    //             ) {
    //               // console.log(
    //               //   listIngredients[listBaseIngredients.indexOf(ing.name)]
    //               //     .quantity
    //               // )
    //               await (listIngredients[
    //                 listBaseIngredients.indexOf(ing.name)
    //               ].quantity += ing.quantity)
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   setCanGetQuants(false)
    // }

    const getIngQuants = async () => {
      getMeals().then((meals) => getIngs(meals))
    }

    getIngQuants()
  }, [weekPlan, listIngredients, listBaseIngredients])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="my-3 mx-2">Grocery List</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul className="list-group">
            {listIngredients.map((ingredient, ind) => {
              return (
                <li key={ind} className="list-group-item">
                  {ingredient.quantity} x {ingredient.name}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
