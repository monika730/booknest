import express from 'express'
import books from '../src/data/books.js'

const app = express()
const port = Number(process.env.API_PORT) || 3001
const readingList = new Map()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'BookNest API' })
})

app.get('/api/books', (request, response) => {
  const search = String(request.query.search || '').trim().toLowerCase()
  const genre = String(request.query.genre || '').trim()
  const results = books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(search)
    const matchesGenre = !genre || genre === 'All genres' || book.genre === genre
    return matchesSearch && matchesGenre
  })

  response.json(results)
})

app.get('/api/books/:id', (request, response) => {
  const book = books.find((item) => item.id === request.params.id)

  if (!book) {
    return response.status(404).json({ message: 'Book not found.' })
  }

  return response.json(book)
})

app.get('/api/reading-list', (_request, response) => {
  response.json([...readingList.values()])
})

app.post('/api/reading-list', (request, response) => {
  const book = books.find((item) => item.id === request.body?.bookId)

  if (!book) {
    return response.status(404).json({ message: 'Book not found.' })
  }

  readingList.set(book.id, book)
  return response.status(201).json([...readingList.values()])
})

app.delete('/api/reading-list/:id', (request, response) => {
  readingList.delete(request.params.id)
  return response.json([...readingList.values()])
})

app.listen(port, '127.0.0.1', () => {
  console.log(`BookNest API listening at http://127.0.0.1:${port}`)
})