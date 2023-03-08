const express =  require('express');
const loadDotenv = require('dotenv');
const ParseOSCrepo = require('../src/utils/projectImg');
const requests = require('requests');
const router = express.Router();
const parseString = require('xml2js').parseString;
const pRouter = express.Router();

function imgLink(githubRepolink) {
    return new Promise((resolve, reject) => {
        requests.get(githubRepolink, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            parseString(body, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result.token);
              }
            })
            }
        })
    })
}

pRouter.get("/", async(req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const result = [];
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    requests.get("https://api.github.com/users/Open-Source-Community-VIT-AP/repos",(err,count) => {
        if (err){
            reject (err)
        }else{
            const jsonfile = req.json();
        }
     })
    for (let i = 0; i < jsonfile.length; i++) {
        result.push({
            "Stars": i["stargazers_count"],
            "Name": i["name"],
            "Description": i["description"],
            "Image": img_link(i["html_url"]),
            "Repository_link": i["html_url"],
            "SSH": i["ssh_url"],
        })
        
    }
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.legth - 1; j++) {
            if (result[j]["Stars"] < result[j+1]["Stars"]) {
                result[j], result[j + 1] = result[j + 1], result[j]
            }
            
        }
        
    }
    for (let i = 0; i < result.length; i++) {
        delete result[i].Stars;
    }

    for (let i = 0; i <=10; i++) {
        res.json(result[i]);
    }
})

router.use('/projects', pRouter);

module.exports = router;