import { defineRoute } from "../../lib/routeModule.js"

export default defineRoute({
  async loader() {
    return { message: 'world' }
  },

  view({ loaderData }) {
    return (
      <h1 class="text-3xl font-bold underline">
        Hello {loaderData.message}!
      </h1>
    )
  },
})
