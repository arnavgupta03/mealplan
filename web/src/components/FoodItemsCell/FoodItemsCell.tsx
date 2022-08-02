import type { FoodItemsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FoodItemsQuery {
    foodItems {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div>
    <li className="list-group-item">No Food Items Yet, Create One!</li>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ foodItems }: CellSuccessProps<FoodItemsQuery>) => {
  return (
    <div>
      {foodItems.map((item) => {
        return (
          <li key={item.id} className="list-group-item d-grid gap-2">
            <Link
              to={routes.foodItem({ id: item.id })}
              className="btn btn-outline-dark"
            >
              {item.name}
            </Link>
          </li>
        )
      })}
    </div>
  )
}
