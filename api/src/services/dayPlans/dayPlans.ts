import type {
  QueryResolvers,
  MutationResolvers,
  DayPlanResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const dayPlans: QueryResolvers['dayPlans'] = () => {
  return db.dayPlan.findMany()
}

export const dayPlan: QueryResolvers['dayPlan'] = ({ id }) => {
  return db.dayPlan.findUnique({
    where: { id },
  })
}

export const createDayPlan: MutationResolvers['createDayPlan'] = ({
  input,
}) => {
  return db.dayPlan.create({
    data: input,
  })
}

export const updateDayPlan: MutationResolvers['updateDayPlan'] = ({
  id,
  input,
}) => {
  return db.dayPlan.update({
    data: input,
    where: { id },
  })
}

export const deleteDayPlan: MutationResolvers['deleteDayPlan'] = ({ id }) => {
  return db.dayPlan.delete({
    where: { id },
  })
}

export const DayPlan: DayPlanResolvers = {
  meals: (_obj, { root }) =>
    db.dayPlan.findUnique({ where: { id: root.id } }).meals(),
  WeekPlan: (_obj, { root }) =>
    db.dayPlan.findUnique({ where: { id: root.id } }).WeekPlan(),
}
