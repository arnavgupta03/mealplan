import type { FoodItemsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

interface Props extends CellSuccessProps<FoodItemsQuery> {
  weekPlanId: string
}

export const QUERY = gql`
  query FoodItemsQuery {
    foodItems {
      id
      name
      weekPlanId
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

export const Success = ({ foodItems, weekPlanId }: Props) => {
  return (
    <div>
      {foodItems.map((item) => {
        return item.weekPlanId == weekPlanId ? (
          <li key={item.id} className="list-group-item d-grid gap-2">
            <Link
              to={routes.foodItem({ id: item.id })}
              className="btn btn-outline-dark"
            >
              {item.name}
            </Link>
          </li>
        ) : null
      })}
    </div>
  )
}
