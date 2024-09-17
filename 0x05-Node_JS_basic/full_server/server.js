const express = require('express');
const routes = require('./routes');

const app = express();
const port = 1245;

routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
module.exports = app;
