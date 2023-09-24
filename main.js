import { LikeDislikeModule } from './LikeDislikeModule.js'

const likeDislikeModule = new LikeDislikeModule()

document.getElementById('like-button').addEventListener('click', () => {
  console.log(likeDislikeModule.toogle())
})

document.getElementById('dislike-button').addEventListener('click', () => {
  likeDislikeModule.dislike()
})
