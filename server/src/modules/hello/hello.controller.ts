import { publicProcedure } from "../../";

export default {
  world: publicProcedure.query(async ({ ctx }) => {

    console.log("Hello from Hello World Controller")
    return "hello world";
  })
}
