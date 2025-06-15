import { Component, csrfField } from 'adonisjsx'

type FormProps = JSX.IntrinsicElements['form']

export const Form: Component<FormProps> = ({ children, ...rest }) => (
  <form {...rest}>
    {csrfField()}
    {children}
  </form>
)
