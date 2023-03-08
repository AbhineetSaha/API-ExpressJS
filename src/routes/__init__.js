const express = require("express");
const event = require('../src/routes/events');
const eb = require('../src/routes/eb_details');
const projects = require('../src/routes/projects');
const apiRouter = express.Router();


apiRouter.get('/', (req,res) => {
  const content = /*
  <h1>OSC-API</h1>
  <h2>/api/events:</h2>
  <p>
      <ul>
          <li><b>/api/event/</b>: GET complete data on all the events. </li>
          <li><b>/api/event/<int:id></b>: GET data from a particular event (from Event ID).</li>
          <li><b>/api/event/latest</b>: GET data of the latest OSC event.</li>
      </ul>
  </p>
  */
 res.send (content)
})
router.use('/api', apiRouter);
module.exports = apiRouter;