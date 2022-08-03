import { Toaster } from '@redwoodjs/web/toast'

import FoodItemCell from 'src/components/FoodItemCell'
interface Props {
  id: string
}

const FoodItemPage = ({ id }: Props) => {
  return (
    <>
      <Toaster />
      <FoodItemCell id={id} />
    </>
  )
}

export default FoodItemPage
