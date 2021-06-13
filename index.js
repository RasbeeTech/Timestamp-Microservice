var express = require('express');
var favicon = require('serve-favicon');

const app = express()

// Set port.
const PORT = process.env.PORT || 3001;

console.log(__dirname + '/public');

// Listen to port.
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Middleware.
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', favicon(__dirname + '/public/favicon.png'));

// Routes.
app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let response = new Date(
    Number(date) ? Number(date) : date
  );
  res.json({
    unix: Number(response),
    utc: response.toUTCString()
  });
})