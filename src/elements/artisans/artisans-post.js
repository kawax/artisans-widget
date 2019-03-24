import { html } from 'lit-html'
import render from '../../lib/render'
import style from '../../lib/style'

class Post extends HTMLElement {
  constructor () {
    super()

    this.url = 'https://artisans.kawax.biz/'
    this.header = 'Laravel職人を探す - 募集'
    this.posts = {}
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
    let postTemplates = []
    for (const post of this.posts) {
      postTemplates.push(
        html`<article class="media">
  <figure class="media-left">
    <p class="image is-32x32">
      <img alt="${post.user.name}" class="is-rounded" width="32" src="${post.user.avatar}">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
     <p class="has-text-primary has-text-weight-semibold">
       <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="has-text-primary">${post.title}</a>
     </p>
     <a href="${post.url}" target="_blank" rel="noopener noreferrer">
         <img src="${post.image}" alt="${post.title}">
     </a>
 </div>
</div>
</article>`,
      )
    }

    return this.html(postTemplates)
  }

  errorHtml (error) {
    return this.html(error)
  }

  connectedCallback () {
    this.getPosts()
  }

  getPosts () {
    const input = this.url + 'api/post?limit=' + this.limit
    const init = {redirect: 'error'}

    fetch(input, init).then(response => {
      return response.json()
    }).then(json => {
      this.posts = json.data
      //console.log(this.posts)
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

customElements.define('artisans-post', Post)
