import { defineRoute } from "../../lib/routeModule.js"

export default defineRoute({
  async loader() {
    return { hello: 'world' }
  },

  view({ loaderData }) {
    return <div>Hello from component requested at {loaderData?.hello}</div>
  },
})
