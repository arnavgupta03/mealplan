import type { FoodItemsQuery } from 'types/graphql'

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

export const Empty = () => <div></div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ foodItems }: CellSuccessProps<FoodItemsQuery>) => {
  return foodItems.map((item) => {
    return (
      <li key={item.id} className="list-group-item list-group-item-action">
        {item.name}
      </li>
    )
  })
}
