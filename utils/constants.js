const Chance = require('chance')
const modelMethods = require('./modelMethods')

const MODEL_METHODS = Object.keys(modelMethods).reduce(
  (methodArray, curMethod) => {
    methodArray.push(modelMethods[curMethod])
    return methodArray
  },
  []
)

const IMAGES = [
  'https://i.kinja-img.com/gawker-media/image/upload/s--z6bssy6q--/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/18bltictofxg7jpg.jpg',
  'https://i.pinimg.com/originals/0f/5c/f0/0f5cf0fab4e206f377b269358f30fc00.jpg',
  'http://i.imgur.com/CLBXP.jpg',
  'https://i.pinimg.com/originals/00/27/21/0027211310e36d326796212e1b735fe5.jpg',
  'https://i.kinja-img.com/gawker-media/image/upload/s--EGPcyxIU--/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/18bltewilfhi6jpg.jpg',
  'http://news.tfw2005.com/wp-content/uploads/sites/10/2017/07/Tyler-Jacobson-Grimlock-Art-01.jpg',
  'https://i.pinimg.com/originals/af/a9/67/afa96757e33e7b271e761683b35a4008.jpg',
  'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Flaurenorsini%2Ffiles%2F2019%2F07%2Flittle-mermaid-e1563804158210.jpg',
  'https://cdn.cynopsis.com/wp-content/uploads/2019/08/magicthegathering.jpg',
  'https://i.kinja-img.com/gawker-media/image/upload/s--UWw8WxhQ--/c_scale,f_auto,fl_progressive,q_80,w_800/nykfnbvs4oabzoohzjgz.png',
  'https://i.pinimg.com/originals/4d/93/36/4d93366c967456ac255e875b9294f0fb.jpg',
  'https://vignette.wikia.nocookie.net/gamelore/images/2/2c/Armored_Wolf-Rider.jpg/revision/latest?cb=20141001123105',
  'https://vignette.wikia.nocookie.net/the-realms-of-kelmarth/images/8/85/Bayditail.jpg/revision/latest?cb=20170825055832'
]

const GENRES = [
  'fiction',
  'non-fiction',
  'romance',
  'biography',
  'kids',
  'teens',
  'how-to',
  'historical',
  'cooking',
  'self-help',
  'easter egg',
  'religion',
  'horror',
  'sci-fi',
  'fantasy',
  'anime',
  'humor',
  'mystery'
]

function createAuthors(num) {
  const names = []
  const chance = new Chance()
  for (let i = 0; i < num; ++i) {
    const name = chance.name()
    names.push(name)
  }
  return names
}

const AUTHORS = createAuthors(50)

const ORDER_STATUSES = ['cart', 'ordered', 'shipped', 'delivered', 'cancelled']

module.exports = {
  ORDER_STATUSES,
  GENRES,
  AUTHORS,
  IMAGES,
  MODEL_METHODS
}
