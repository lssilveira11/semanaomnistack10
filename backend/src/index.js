const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const port = 3333


mongoose.connect('mongodb+srv://oministack:semana10@cluster0-gxtnp.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


// PARAMETROS:
// query params --> req.query (filtros, ordenacao, paginacao)
// route params --> req.params (identificar um recurso)
// body --> req.body (dados em formato json)

// app.get('/', (req, res) => {
//   res.json({
//     message: "Hello world!"
//   })
// })

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(routes)

app.listen(port, () => console.log(`Example app listening on port port!`))