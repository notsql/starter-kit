import { db, user } from "@db";
import { eq } from "drizzle-orm";

import { ResultAsync } from "neverthrow";

export const getUserById = (userId: string) => {
  return ResultAsync.fromPromise(db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, userId)
  }), (error) => error);
}

export const getUserByEmail = (email: string) => {
  return ResultAsync.fromPromise(
    db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email)
    }),
    (error) => error);
}

export const createUser = (data: typeof user.$inferInsert) => {
  return ResultAsync.fromPromise(db.insert(user).values(data),
    (error) => error);
}

export const updateUser = (id: string, data: typeof user.$inferInsert) => {
  return ResultAsync.fromPromise(db.update(user).set({
    email: data.email,
    name: data.name
  }).where(eq(user.id, id)), (error) => error)
}
