import React, { useState } from 'react'
import YouTube from 'react-youtube'
import axios from 'axios'
import {
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Row,
  Col,
  Modal,
  ButtonGroup,
} from 'reactstrap'

const App = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [modal, setModal] = useState(false)
  const [selectedVideoId, setSelectedVideoId] = useState('')
  const [nextPageToken, setNextPageToken] = useState('')
  const [prevPageToken, setPrevPageToken] = useState('')

  const toggle = () => setModal(!modal)

  const handleSearch = () => {
    axios.get(`/api/search?query=${query}&num=12`).then(({ data }) => {
      setResults(data.items)
      setNextPageToken(data.nextPageToken)
      setPrevPageToken(data.prevPageToken)
    })
  }

  const handleSelectVideo = (id) => () => {
    setSelectedVideoId(id)
    toggle()
  }

  const handlePagination = (pageToken) => () => {
    axios
      .get(`/api/search?query=${query}&num=12&pageToken=${pageToken}`)
      .then(({ data }) => {
        setResults(data.items)
        setNextPageToken(data.nextPageToken)
        setPrevPageToken(data.prevPageToken)
      })
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
          return (
            <Col
              style={{ overflow: 'hidden' }}
              xs={6}
              sm={4}
              md={3}
              key={video.id.videoId}
              onClick={handleSelectVideo(video.id.videoId)}
            >
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
      {results.length > 0 && (
        <ButtonGroup>
          <Button onClick={handlePagination(prevPageToken)}>
            Previous Page
          </Button>
          <Button onClick={handlePagination(nextPageToken)}>Next Page</Button>
        </ButtonGroup>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <YouTube videoId={selectedVideoId} />
      </Modal>
    </Container>
  )
}

export default App
