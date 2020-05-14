const express = require('express')
const app = express();
const path = require('path');
const router = express.Router();
const reload = require('reload');

router.get("/", function(req, res){
  res.sendFile(path.join(__dirname+"/views/index.html"));
});

router.get("/main", function(req, res){
  res.sendFile(path.join(__dirname+'/views/main.html'));
});

router.get("/manifest", function(req, res){
  res.sendFile(path.join(__dirname+"/manifest.webmanifest"));
});

router.get("/image", function(req, res){
  res.sendFile(path.join(__dirname+"/public/images/transmutation-humaine-192.png"));
});

app.use('/', router);
app.use(express.static('public'));
app.use(express.static('views'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
});

reload(app);