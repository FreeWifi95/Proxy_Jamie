const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));

app.get("/house/:houseId/",(req,res) =>  {
  request(`http://localhost:3007/house/${req.params.houseId}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});
app.get(`/house/:houseId/reviews`,(req,res) =>  {
  request(`http://localhost:3007/house/${req.params.houseId}/reviews?page=${req.query.page}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

app.get('/users',(req,res) =>  {
request("http://localhost:3007/users",function(err,response,body) {
  if (err) {
    res.sendStatus(500);
  } else {
    res.send(body);
  }
})
});
app.get('/user/:userId',(req,res) =>  {
  request(`http://localhost:3007/user/${req.params.userId}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

app.get('/dates/:id', (req, res) => {
  console.log('proxyxyxyxy')
  request(`http://localhost:3002/dates/${req.params.id}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
})
app.get('/info/:id', (req, res) => {
  request(`http://localhost:3002/info/${req.params.id}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
})
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
