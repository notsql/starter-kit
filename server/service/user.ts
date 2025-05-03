import { db, type Models } from "../../db";

import { ResultAsync } from "neverthrow";

export const getUserById = (userId: string) => {
  return ResultAsync.fromPromise(db.user.findFirst({
    where: {
      id: {
        equals: userId
      }
    }
  }), (error) => error);
}

export const getUserByEmail = (email: string) => {
  return ResultAsync.fromPromise(
    db.user.findFirst({
      where: {
        email: {
          equals: email
        }
      }
    }),
    (error) => error);
}

export const createUser = (data: Models.UserCreateInput) => {
  return ResultAsync.fromPromise(db.user.create({
    data
  }),
    (error) => error);
}

export const updateUser = (id: string, data: Models.UserUpdateInput) => {
  return ResultAsync.fromPromise(db.user.update({
    data,
    where: {
      id
    }
  }), (error) => error)
}
