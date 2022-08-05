import type {
  QueryResolvers,
  MutationResolvers,
  WeekPlanResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const weekPlans: QueryResolvers['weekPlans'] = () => {
  return db.weekPlan.findMany()
}

export const weekPlan: QueryResolvers['weekPlan'] = ({ id }) => {
  return db.weekPlan.findUnique({
    where: { id },
  })
}

export const createWeekPlan: MutationResolvers['createWeekPlan'] = ({
  input,
}) => {
  return db.weekPlan.create({
    data: input,
  })
}

export const updateWeekPlan: MutationResolvers['updateWeekPlan'] = ({
  id,
  input,
}) => {
  return db.weekPlan.update({
    data: input,
    where: { id },
  })
}

export const deleteWeekPlan: MutationResolvers['deleteWeekPlan'] = ({ id }) => {
  return db.weekPlan.delete({
    where: { id },
  })
}

export const WeekPlan: WeekPlanResolvers = {
  recipes: (_obj, { root }) =>
    db.weekPlan.findUnique({ where: { id: root.id } }).recipes(),
  days: (_obj, { root }) =>
    db.weekPlan.findUnique({ where: { id: root.id } }).days(),
}
