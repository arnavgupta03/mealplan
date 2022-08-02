import FoodItemCell from 'src/components/FoodItemCell'

interface Props {
  id: string
}

const FoodItemPage = ({ id }: Props) => {
  return (
    <>
      <FoodItemCell id={id} />
    </>
  )
}

export default FoodItemPage
