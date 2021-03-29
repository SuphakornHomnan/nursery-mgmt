const mongoose = require('mongoose')

const { MONGO_USER, MONGO_PASS, MONGO_DB } = process.env

const mongoURL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@first-cluster.nvg6s.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log(`${new Date()} || mongodb connected`))
  .catch((err) => console.log(err))
