import { html } from 'lit-html'
import render from '../../lib/render'

class Profile extends HTMLElement {
  constructor () {
    super()

    this.url = 'https://artisans.kawax.biz/'
  }

  html () {
    const src = this.url + 'image/user/' + this.name
    return html`<a href="${this.url}@${this.name}" target="_blank" rel="noopener noreferrer">
<img alt="${this.name}" src="${src}" width="${this.width}">
</a>`
  }

  connectedCallback () {
    render(this.html(), this)
  }

  get name () {
    return this.getAttribute('name')
  }

  set name (val) {
    if (val) {
      this.setAttribute('name', val)
    }
    else {
      this.removeAttribute('name')
    }
  }

  get width () {
    return this.getAttribute('width')
  }

  set width (val) {
    if (val) {
      this.setAttribute('width', val)
    }
    else {
      this.removeAttribute('width')
    }
  }
}

customElements.define('artisans-profile', Profile)
