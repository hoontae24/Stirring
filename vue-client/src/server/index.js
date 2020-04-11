const path = require('path');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const history = require('connect-history-api-fallback');

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
const envDefaultPath = path.resolve(process.cwd(), '.env.defaults');
dotenv.config({ path: fs.existsSync(envPath) ? envPath : envDefaultPath });

const PORT = process.env.SERVER_PORT || 4000;

const app = express();
const staticFileMiddleware = express.static(path.join(__dirname, '/public'));

app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);

app.get('/', function(req, res) {
  res.render(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => console.log(`Express serving on ${PORT}!`));
