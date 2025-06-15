import { defineRoute } from "../../lib/routeModule.js"

export default defineRoute({
  async loader() {
    return { message: 'world' }
  },

  view({ loaderData }) {
    return <div>Hello from component requested at {loaderData.message}</div>
  },
})
