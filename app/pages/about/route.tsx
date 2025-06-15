import { csrfField } from "adonisjsx";
import { defineRoute } from "../../../lib/routeModule.js";

export default defineRoute({
  meta() {
    return [
      <title>About</title>
    ]
  },
  async action({ ctx }) {
    const email = ctx.request.body()['email']
    ctx.session.flash('message', `Stored email ${email}`)
  },
  view({ ctx }) {
    const message = ctx.session.flashMessages.pull('message')
    return (
      <form method="POST">
        {csrfField()}
        <input name="email" type="email"></input>
        <button>Submit</button>
        {message && <div>{message}</div>}
      </form>
    )
  }
})