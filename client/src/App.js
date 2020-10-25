import React, { useState } from 'react'
import axios from 'axios'
import {
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap'

const App = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = () => {
    axios
      .get(`/api/search?query=${query}&num=12`)
      .then(({ data }) => setResults(data.items))
  }

  return (
    <Container>
      <h1 className="text-center">Mark Wien's Youtube Channel</h1>
      <InputGroup style={{ marginBottom: 40 }}>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} />
        <InputGroupAddon addonType="append">
          <Button onClick={handleSearch}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
      <Row>
        {results.map((video) => {
          console.log(video)
          return (
            <Col xs={6} sm={4} md={3} key={video.id.videoId}>
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
              />
              <p>
                <strong>{video.snippet.title}</strong>
              </p>
              <p>{video.snippet.description}</p>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default App
