const Tag = require('../models/tag')

let popTags = new Array(5)

module.exports = {
  push: (req, res) => {
    const { word } = req.params

    Tag.push(word)
      .then(tag => {
        res.json({ success: true, tag })
      })
      .catch(err => {
        res.json({ message: err.message })
      })
  },

  getTop5: (req, res) => {
    res.json({ success: true, popTags })
  },

  refreshPopTags: () => {
    Tag.getAll().then(tags => {
      tags = tags.map(tag => tag.word)
      tagCounts = []
      tags.forEach(word => {
        const map = tagCounts.map(item => item.word)
        if (map.includes(word)) tagCounts[map.indexOf(word)].count++
        else tagCounts.push({ word, count: 1 })
      })
      tagCounts.sort((a, b) =>
        a.count > b.count ? -1 : a.count < b.count ? 1 : 0
      )
      popTags = tagCounts.slice(0, 5).map(tag => tag.word)
      console.log('popTags', popTags)
    })
  }
}
