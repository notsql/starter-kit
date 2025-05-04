import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text({ mode: "text" }).unique().notNull().primaryKey(),
  name: text({ mode: "text" }).notNull(),
  email: text({ mode: "text" }).unique().notNull()
});
