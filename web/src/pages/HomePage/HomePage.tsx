import { useEffect, useState } from 'react'

import { MetaTags, useMutation } from '@redwoodjs/web'

import WeekPlanCell from 'src/components/WeekPlanCell'
// import { QUERY } from 'src/components/WeekPlanCell/WeekPlanCell'

export const CREATE_WEEK_PLAN = gql`
  mutation CreateWeekPlanMutation($input: CreateWeekPlanInput!) {
    createWeekPlan(input: $input) {
      id
    }
  }
`

const HomePage = () => {
  const [createWeekPlanHome] = useMutation(CREATE_WEEK_PLAN)
  const [thisWeekPlanId, setThisWeekPlanId] = useState(
    localStorage.getItem('weekPlanId')
  )

  useEffect(() => {
    console.log(thisWeekPlanId)
    if (!thisWeekPlanId) {
      createWeekPlanHome({
        variables: { input: { name: 'Any' } },
      }).then((data) => {
        console.log(data)
        localStorage.setItem('weekPlanId', data.data.createWeekPlan.id)
        setThisWeekPlanId(data.data.createWeekPlan.id)
      })
    }
  }, [thisWeekPlanId, createWeekPlanHome])

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <WeekPlanCell id={thisWeekPlanId} />
    </>
  )
}

export default HomePage
