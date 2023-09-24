import axios from 'axios'

const main = document.querySelector('#favourites')
let clientid = '_xxJc-6OaCWHTyo4LQNa9mxtNEtgtccgsjivXFa2yGc'

const likedCollection = async () => {
  const likePost = localStorage.getItem('list')
  const posts = JSON.parse(likePost)

  posts.map(async (i) => {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/${i}?client_id=${clientid}`
    )

    const {
      urls: { regular },
    } = data

    const geturl = () => {
      return `<img src="${regular}" />`
    }

    main.innerHTML += geturl()
  })
}

likedCollection()
