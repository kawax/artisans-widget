import { html } from 'lit-html'

export default () => {
  const url = 'https://widget.kawax.biz/css/artisans.css'

  return html`<style>
@import "${url}"
</style>`
}
