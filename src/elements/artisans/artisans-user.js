import { html } from 'lit-html'
import render from '../../lib/render'
import style from '../../lib/style'

class User extends HTMLElement {
  constructor () {
    super()

    this.url = 'https://artisans.kawax.biz/'
    this.header = 'Laravel職人を探す - 職人'
    this.users = {}
  }

  html (text) {
    return html`${style()}<article class="message is-primary">
        <div class="message-header">
            <p>${this.header}</p>
        </div>
        <div class="message-body has-background-white is-paddingless">
           ${text}
        </div>
    </article>`
  }

  successHtml () {
    //<img alt="${user.name}" src="${this.url}image/user/${user.name}"
    // width="200">
    let userTemplates = []
    for (const user of this.users) {
      userTemplates.push(
        html`<article class="media">
  <figure class="media-left">
    <p class="image is-32x32">
      <img alt="${user.name}" class="is-rounded" width="32" src="${user.avatar}">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
     <p class="has-text-primary has-text-weight-semibold">
       <a href="${user.url}" target="_blank" rel="noopener noreferrer" class="has-text-primary">${user.name}</a>
     </p>
    <p>${user.title}</p>
 </div>
</div>
</article>`,
      )
    }

    return this.html(userTemplates)
  }

  errorHtml (error) {
    return this.html(error)
  }

  connectedCallback () {
    this.getUsers()
  }

  getUsers () {
    fetch(this.url + 'api/user?limit=' + this.limit).then(response => {
      return response.json()
    }).then(json => {
      this.users = json.data
      //console.log(this.users)
      render(this.successHtml(), this)
    }).catch(error => {
      //console.log(error)
      render(this.errorHtml(error), this)
    })
  }

  get limit () {
    return this.getAttribute('limit') || 10
  }

  set limit (val) {
    if (val) {
      this.setAttribute('limit', val)
    }
    else {
      this.removeAttribute('limit')
    }
  }
}

customElements.define('artisans-user', User)
