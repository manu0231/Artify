import axios from 'axios'
import { createApi } from 'unsplash-js'
const main = document.querySelector('#main')

let Form = document.getElementById('myForm')
const imageList = []
import { LikeDislikeModule } from './LikeDislikeModule.js'

const likeDislikeModule = new LikeDislikeModule()

let clientid = '_xxJc-6OaCWHTyo4LQNa9mxtNEtgtccgsjivXFa2yGc'

const unsplash = createApi({
  accessKey: clientid,
})

const art = [
  'Visual Arts',
  'Performing Arts',
  'Literary Arts',
  'Music',
  'Film and Cinema',
  'Design Arts',
  'Crafts',
  'Culinary Arts',
  'Martial Arts',
  'Folk and Traditional Arts',
  'Digital Arts',
  'Street and Graffiti Art',
  'Performance Art',
  'Decorative Arts',
  'Media Arts',
]

const searchImg = async (art) => {
  const result = await unsplash.search.getPhotos({
    query: art,
    page: '1',
    perPage: 24,
    orientation: 'portrait',
  })

  if (result.type == 'success') {
    const photos = result.response.results
    console.log(photos)
    const geturl = photos.map((index) => {
      return `<img src="${index.urls.small}"  id="${index.id}" />`
    })

    main.innerHTML = geturl.join('')
  }
}

// Arts button
const artList = art.map((i) => {
  return `<button  class='btn' value="${i}">${i}</button>`
})

Form.innerHTML = artList.join('')

Form.addEventListener('click', (e) => {
  e.preventDefault()

  let output = e.target.value
  searchImg(output)
})

const imageDetail = async (url) => {
  const imgContainer = document.createElement('div')
  document.body.appendChild(imgContainer)
  imgContainer.classList.add('imgContainer')
  const detailImage = document.createElement('div')
  const imgDescription = document.createElement('div')
  imgContainer.appendChild(detailImage)
  detailImage.classList.add('detailImage')
  imgContainer.appendChild(imgDescription)
  imgDescription.classList.add('imgDescription')

  const clsBtn = document.createElement('button')
  clsBtn.classList.add('clsBtn')
  imgContainer.appendChild(clsBtn)
  clsBtn.id = 'close'
  clsBtn.innerHTML = 'X'

  var imgElement = document.createElement('img')
  detailImage.appendChild(imgElement)
  const {
    data: {
      urls: { regular },
      alt_description,
      id,
      tags,
      location: { name: location },
      user: {
        name,
        profile_image: { medium: ProfileImg },
      },
      //,
    },
  } = await axios.get(url)

  imgElement.src = regular

  clsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    document.body.removeChild(imgContainer)
  })

  const imgAbout = document.createElement('div')
  imgDescription.appendChild(imgAbout)

  const User = document.createElement('div')
  User.classList.add('user')
  imgAbout.appendChild(User)

  const profile = document.createElement('img')
  const userName = document.createElement('h4')
  const likedButton = document.createElement('button')
  const liked = document.createElement('i')
  likedButton.append(liked)
  likedButton.classList.add('like')
  liked.classList.add('fa-heart')

  const likePost = localStorage.getItem('list')
  const isInArray = (value, array) => {
    return array.indexOf(value) > -1
  }
  const isLikedAlready = isInArray(id, likePost)
  if (isLikedAlready) {
    liked.classList.remove('far')
    liked.classList.add('fas')
  } else {
    liked.classList.remove('fas')
    liked.classList.add('far')
  }
  User.appendChild(profile)
  User.appendChild(userName)
  User.appendChild(likedButton)

  const imgDes = document.createElement('h5')
  const locationTag = document.createElement('b')

  imgDescription.appendChild(imgDes)
  imgDescription.appendChild(locationTag)
  imgDes.classList.add('imgDes')

  userName.innerHTML = name
  profile.src = ProfileImg
  locationTag.innerHTML = location
  imgDes.innerHTML = alt_description
  // likedButton.innerHTML = 'Like'

  const tagList = document.createElement('ul')
  tagList.classList.add('tagList')
  imgDescription.appendChild(tagList)
  const listItem = tags.map((i) => {
    return `<li>${i.title}</li>`
  })
  tagList.innerHTML = listItem.join('')

  likedButton.addEventListener('click', (e) => {
    e.preventDefault
    const isLiked = likeDislikeModule.toggle()
    if (isLiked) {
      liked.classList.remove('far')
      liked.classList.add('fas')
      imageList.push(id)
      localStorage.setItem('list', JSON.stringify(imageList))
    } else {
      liked.classList.remove('fas')
      liked.classList.add('far')
      imageList.pop(id)
      localStorage.setItem('list', JSON.stringify(imageList))
    }
  })

  imgContainer.addEventListener('mousedown', (e) => {
    e.stopPropagation()
  })

  document.body.addEventListener('mousedown', (e) => {
    if (
      document.body.contains(imgContainer) &&
      !imgContainer.contains(e.target)
    ) {
      document.body.removeChild(imgContainer)
    }
  })
}

main.addEventListener('click', (e) => {
  const { id } = e.target

  const url = `http://api.unsplash.com/photos/${id}?client_id=${clientid}`

  imageDetail(url)
})
