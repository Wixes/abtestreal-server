const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use('/api', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log('server is listening');
});