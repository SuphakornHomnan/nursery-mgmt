const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URL

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log(`${new Date()} || mongodb connected`))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
