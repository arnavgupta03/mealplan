import { MetaTags } from '@redwoodjs/web'

import GroceryListCell from 'src/components/GroceryListCell'

interface Props {
  id: string
}

const GroceryListPage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Grocery List" description="GroceryList page" />

      <GroceryListCell id={id} />
    </>
  )
}

export default GroceryListPage
