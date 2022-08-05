import type {
  QueryResolvers,
  MutationResolvers,
  FoodItemResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const foodItems: QueryResolvers['foodItems'] = () => {
  return db.foodItem.findMany()
}

export const foodItem: QueryResolvers['foodItem'] = ({ id }) => {
  return db.foodItem.findUnique({
    where: { id },
  })
}

export const createFoodItem: MutationResolvers['createFoodItem'] = ({
  input,
}) => {
  return db.foodItem.create({
    data: input,
  })
}

export const updateFoodItem: MutationResolvers['updateFoodItem'] = ({
  id,
  input,
}) => {
  return db.foodItem.update({
    data: input,
    where: { id },
  })
}

export const deleteFoodItem: MutationResolvers['deleteFoodItem'] = ({ id }) => {
  return db.foodItem.delete({
    where: { id },
  })
}

export const FoodItem: FoodItemResolvers = {
  ingredients: (_obj, { root }) =>
    db.foodItem.findUnique({ where: { id: root.id } }).ingredients(),
  DayPlan: (_obj, { root }) =>
    db.foodItem.findUnique({ where: { id: root.id } }).DayPlan(),
  WeekPlan: (_obj, { root }) =>
    db.foodItem.findUnique({ where: { id: root.id } }).WeekPlan(),
}
