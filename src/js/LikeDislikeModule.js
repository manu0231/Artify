export class LikeDislikeModule {
  constructor() {
    this.liked = false
  }

  like() {
    return (this.liked = true)
  }

  dislike() {
    return (this.liked = false)
  }

  toggle() {
    return (this.liked = !this.liked)
  }
}
