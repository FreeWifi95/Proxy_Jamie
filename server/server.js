const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const axios = require('axios');

const app = express()
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.use('/:id', express.static(path.join(__dirname, '../public')));

const getData = (url, res) => {
  axios.get(url)
    .then(response => res.send(response.data))
    .catch((err) => { throw err; });
};

app.get('/photos/:id', (req, res) => {
  const url = `http://photos.taxwawufkp.us-west-1.elasticbeanstalk.com/photos/${req.params.id}`;
  getData(url, res);
});

app.get('/house/:houseId/', (req, res) => {
  const url = `http://gsgsignup-env.vynmi2jism.us-west-2.elasticbeanstalk.com/house/${req.params.houseId}`;
  getData(url, res);
});

app.get(`/house/:houseId/reviews`,(req,res) =>  {
  const url = `http://gsgsignup-env.vynmi2jism.us-west-2.elasticbeanstalk.com/house/${req.params.houseId}/reviews?page=${req.query.page}`;
   getData(url,res);
});

app.get('/users',(req,res) =>  {
  const url = `http://gsgsignup-env.vynmi2jism.us-west-2.elasticbeanstalk.com/users/${req.params.houseId}`;
  getData(url,res);
});

app.get('/user/:userId',(req,res) =>  {
  const url = `http://gsgsignup-env.vynmi2jism.us-west-2.elasticbeanstalk.com/user/${req.params.userId}`;
  getData(url,res);

});


app.get('/info/:id', (req, res) => {
  const url = `http://env-dev.brgmruhzxf.us-west-1.elasticbeanstalk.com/info/${req.params.id}`;
  getData(url, res);
});

app.get('/dates/:id', (req, res) => {
  const url = `http://env-dev.brgmruhzxf.us-west-1.elasticbeanstalk.com/dates/${req.params.id}`;
  getData(url, res);
});

app.post('/dates/:id', (req, res) => {
  axios.post(`http://env-dev.brgmruhzxf.us-west-1.elasticbeanstalk.com/dates/${req.params.id}`, req.body)
    .then(response => res.send('success'))
    .catch((err) => { throw err; });
});

app.get('/listing/:id', (req, res) => {
  const url = `http://bnbclone2.mk2gvayuhh.us-east-1.elasticbeanstalk.com/listing/${req.params.id}`;
  getData(url,res);
});
app.get('/lists/:id', (req, res) => {
  const url = `http://bnbclone2.mk2gvayuhh.us-east-1.elasticbeanstalk.com/lists/${req.params.id}`;
  getData(url,res);
});

app.get('/lists2listings/:id', (req, res) => {
  request({url: 'http://bnbclone2.mk2gvayuhh.us-east-1.elasticbeanstalk.com/lists2listings/:id', qs: { listingIds: req.query.listingIds}}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

app.get('/like/:id', (req, res) => {
  request({url: 'http://bnbclone2.mk2gvayuhh.us-east-1.elasticbeanstalk.com/like/:id', qs: { data: req.query.data }}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});
app.post('/like', (req, res) => {
  request.post('http://bnbclone2.mk2gvayuhh.us-east-1.elasticbeanstalk.com/like', {form:{data: req.body.data}}, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('we did it')
    }
  });
});

app.post('/lists', (req, res) => {
  request.post('http://bnbclone2.mk2gvayuhh.us-east-1.elasticbeanstalk.com/lists', {form:{
    listingId: req.body.listingId,
    listId: req.body.listId,
    liked: req.body.liked}
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('we did it lists')
    }
  });
});
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
