const express = require('express')
const app = express()
const port = 3001
const path = require ('path')

app.get('/', (req, res) => {
  res.send("Hey! This is the OSC API that is used to serve OSC details for it's various platforms.")
})

app.get('/favicon.ico', function(req, res){
  var options = {
      root: path.join(__dirname , 'assets')
  };
   
  var fileName = 'favicon.ico';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          console.log(err);
      } else {
          console.log('Sent:', fileName);
      }
  });
});

// app.get('/eb', function(req,res){
//     res.redirect('')
// })

// app.get('/event', function(req,res){
//     res.redirect('')
 
// })
// app.get('/projects', function(req,res){
//     res.redirect('')
// })

// app.get('/api', function(req,res){
//    res.redirect('')
// })

app.listen(port, () => {
  console.log(`API is listening on port ${port}`)
})
