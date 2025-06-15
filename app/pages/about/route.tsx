import logger from "@adonisjs/core/services/logger";
import { defineRoute } from "../../../lib/routeModule.js";

export default defineRoute({
  async action({ ctx }) {
    logger.info(ctx.request.body(), "Received post")
  },
  view() {
    return (
      <form method="POST">
        <input name="email"></input>
        <button>Submit</button>
      </form>
    )
  }
})