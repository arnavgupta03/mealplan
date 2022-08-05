import { MetaTags } from '@redwoodjs/web'

import WeekPlanCell from 'src/components/WeekPlanCell'

interface Props {
  id: string
}

const WeekPlanPage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="WeekPlan" description="WeekPlan page" />

      <WeekPlanCell id={id} />
    </>
  )
}

export default WeekPlanPage
