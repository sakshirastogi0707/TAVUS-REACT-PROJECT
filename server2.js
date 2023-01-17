const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs')
const axios = require('axios');
var API_URL = 'http://157.245.95.112:5000/api/v1/';
// app.get('/', function(request, response) {
//   console.log('Home page visited!');
//   const filePath = path.resolve(__dirname, './build', 'index.html');

//   // read in the index.html file
//   fs.readFile(filePath, 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
    
//     // replace the special strings with server generated strings
//     data = data.replace(/\$OG_TITLE/g, 'Home Page');
//     data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
//     result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//     response.send(result);
//   });
// });

app.get('/video', async function(request, response) {
  //console.log('video page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', async function (err,data) {
    if (err) {
      return console.log(err);
    }
    try{
      //const url = `${process.env.THIRD_PARTY_API_PATH}/create_request?template_id=${req.query.template_id}&video_name=${req.query.video_name}`;
      const url = `${API_URL}videos/${request.query.id}`;
      const responseApi = await axios.get(url);
      var result = data.replace(/\$OG_IMAGE/g, responseApi.data.data.gif_thumbnail_url);
      //console.log('response',responseApi.data.data.gif_thumbnail_url)
      response.send(result);
    }catch(e){
      console.log(e)
      //result = data.replace(/\$OG_IMAGE/g, 'https://uploads-ssl.webflow.com/5fec06437e89c52c66fe2ba0/5ff73b447e302b793d3169fa_Asset%201-p-500.png');
      response.send(result);

    }
    //data = data.replace(/\$OG_TITLE/g, 'About Page');
    //data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
    
  });
});

// app.get('/contact', function(request, response) {
//   console.log('Contact page visited!');
//   const filePath = path.resolve(__dirname, './build', 'index.html')
//   fs.readFile(filePath, 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
//     data = data.replace(/\$OG_TITLE/g, 'Contact Page');
//     data = data.replace(/\$OG_DESCRIPTION/g, "Contact page description");
//     result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//     response.send(result);
//   });
// });

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));