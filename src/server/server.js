const log = require('fancy-log');
const app = require('./app');


const port = process.env.PORT || 3000;
app.listen(port, () => log(`server listening on port: '${port}'`));
