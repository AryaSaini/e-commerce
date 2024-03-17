const express = require('express');
const routes = require('./routes');
const apiRoutes = require('./routes/api')


const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./config/connection')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use('/api', apiRoutes)


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
