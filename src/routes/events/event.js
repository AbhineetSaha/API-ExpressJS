const express = require('express');
const router = express.Router();
const { connection } = require('../src/routes/events/db_connection');
const { sendDiscordAnnouncement } = require('../src/utils/discord_webhook');

router.get('/', async (req, res) => {
  const eventId = req.query.id;
  if (!eventId) {
    const data = connection();
    res.json(data)
  } else {
    const data = connection("eventID", eventId);
    if (data){
        res.json(data)
    } else {
        res.status(404).json({error: "Event with ID "+ eventId +  " not found"});
    }
    res.json(data)
  }
});

router.get('/latest', async(req, res) => {
    const data = connection("latest")
    res.json(data)
})

router.get("/announcemnet", async(req,res) => {
    const API_KEY = process.env.API_KEY;
    const WEBHOOK_URL = process.env.WEBHOOK_URL;

    const apiKey = req.query.key;
    const eventId = req.query.id
    const requiredEvent = None;

    if (apiKey != API_KEY || !API_KEY) {
        res.status(401).json({error: "Unauthorized: Invalid API Key"})
    }
    if (!WEBHOOK_URL){
        res.status(500).json({error: "Internal Error: No Webhook URL is configured in environment variables"})
    }
    if (!eventId){
        requiredEvent = connection("latest");
    } else {
        requiredEvent = connection("eventID", eventId);
        if (!requiredEvent){
            res.status(400).json({error: "Event with ID "+ eventId +  " not found"})
        }
        console.log(requiredEvent);
    }
    const status = sendDiscordAnnouncement(WEBHOOK_URL, requiredEvent);
    res.json({"success": status})
})

module.exports = router;