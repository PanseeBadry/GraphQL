import express from 'express'
import { connection } from './db/dbConnection.js'
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema/schema.js';
import dotenv from 'dotenv';

dotenv.config();


  import playGround from 'graphql-playground-middleware-express'
  const expressPlayground = playGround.default
const app = express()
const port = 3000



app.use('/graphql',createHandler({schema}))
connection() 
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/gui', expressPlayground({ endpoint: '/graphql' }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


