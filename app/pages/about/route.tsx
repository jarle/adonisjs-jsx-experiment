import { Form } from "#components/form";
import { defineRoute } from "#lib/route_module";

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
      <Form method="POST">
        <input name="email" type="email"></input>
        <button>Submit</button>
        {message && <div>{message}</div>}
      </Form>
    )
  }
})