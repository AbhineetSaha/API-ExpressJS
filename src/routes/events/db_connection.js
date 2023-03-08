require('dotenv').config()// Load environment variables from .env file

const { json } = require('express');
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

// Parse JSON Date
const jsonData = JSON.parse(requestBody)

function connection(type=nodemon, ...args) {
    let query;
    if (!type){
        query = "SELECT * FROM eventreg_event";
    }else if (type === "latest") {
        query = "SELECT * FROM eventreg_event ORDER BY id DESC LIMIT 1"
    }else if (type === "eventID"){
        query = "SELECT * FROM eventreg_event WHERE id = ${args[0]}";
    }
    pool.query (query,(err,count) =>{
        if (err){
            return(err);
        }else{
            const result = res.row.map(row => ({
                id : row[0],
                eventNAme : row[1],
                eventCaption: row[2],
                eventDescription: row[3],
                eventVenue: row[4],
                eventDate: row[5],
                eventStartTime: row[6],
                eventEndTime: row[7],
                eventRegEndDate: row[8],
                eventRegEndTime: row[9],
                eventSpeaker: row[10],
                eventURL: row[11],
                eventDocumentation: row[12],
                eventLogo: `https://drive.google.com/uc?export=view&id=${row[13].split("/")[5]}`,
            })
        )}
        if (!result){
            return None;
        }
        result.sort((a, b) => a.id - b.id);
        return json(data);
    })
};


