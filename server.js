const express = require("express");
const app =  express();
const path = require("path");
const PORT =9000;
const fs = require('fs')
const axios = require('axios');
var API_URL = 'http://18.217.129.207:5000/api/v1/';
var title = 'Tavus';
var ogtitle = 'Tavus';

app.get('/video', async function(request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', async function (err,data) {
      if (err) {
        return console.log(err);
      }
      try{
        //const url = `${process.env.THIRD_PARTY_API_PATH}/create_request?template_id=${req.query.template_id}&video_name=${req.query.video_name}`;
        const url = `${API_URL}videos/${request.query.id}`;
        const responseApi = await axios.get(url);
        if(responseApi.data.data.landing_title){
          title = responseApi.data.data.landing_title
          ogtitle = responseApi.data.data.landing_title
        }
        //data = data.replace(/\$TITLE/g, title);
        data = data.replace('<title>Tavus</title>', `<title>${title}</title>`);
        //data = data.replace(/\$OG_TITLE/g, ogtitle);
        data = data.replace('<meta property="og:title" content="Tavus" />', `<meta property="og:title" content="${ogtitle}" />`);
        data = data.replace(/\$OG_IMAGE/g, responseApi.data.data.gif_thumbnail_url);
        response.send(data);
      }catch(e){
        console.log(e)
        //result = data.replace(/\$OG_IMAGE/g, 'https://uploads-ssl.webflow.com/5fec06437e89c52c66fe2ba0/5ff73b447e302b793d3169fa_Asset%201-p-500.png');
        response.send(data);
  
      }
      //data = data.replace(/\$OG_TITLE/g, 'About Page');
      //data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
      
    });
  });

//app.use(express.static(path.join(__dirname, "frontend","build")));
app.use("/", express.static(__dirname + "/build"));


app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'/', "build/index.html"));
});

app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname,'build'));
});

app.listen(PORT, () => {
    console.log('Server listening on port '+PORT)
})
