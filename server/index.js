require('dotenv').config()

const express = require('express')
const axios = require('axios')

const app = express()

const PORT = process.env.PORT || 5000

app.get('/api/search', (req, res) => {
  const query = req.query.query || ''
  const maxResults = req.query.num || 12
  const pageToken = req.query.pageToken || ''

  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${process.env.YOUTUBE_API_KEY}&part=snippet&channelId=${process.env.CHANNEL_ID}&maxResults=${maxResults}&order=date&pageToken=${pageToken}`,
    )
    .then(({ data }) => res.json(data))
    .catch((err) => res.json({ error: err.message }))
})

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))
