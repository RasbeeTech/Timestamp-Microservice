var express = require('express');
var favicon = require('serve-favicon');

const app = express()

// Enable CORS.
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));


// Listen to port.
const PORT = process.env.PORT || 3001;
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
  let response;
  if(!date){
    response = new Date();
  } else {
    response = new Date(
    Number(date) ? Number(date) : date
    );
  }
  if(response.toString() === 'Invalid Date' ){
    res.json({error: response.toString()});
  }
  res.json({
    unix: Number(response),
    utc: response.toUTCString()
  });
})