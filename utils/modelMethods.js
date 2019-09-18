function showMagic(Model) {
  console.log(Object.keys(Model.prototype))
}

async function findOneRandom(Model) {
  const count = await Model.count()
  const randomIndex = Math.floor(Math.random() * count)
  return Model.findByPk(randomIndex)
}

module.exports = {
  showMagic,
  findOneRandom
}
