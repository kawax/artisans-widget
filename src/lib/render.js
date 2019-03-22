import { render } from 'lit-html'

export default (html, component) => {
  return render(html,
    component.shadowRoot || component.attachShadow({mode: 'open'}))
}
