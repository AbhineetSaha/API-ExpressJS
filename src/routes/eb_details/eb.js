// all the imports 
const express = require('express');
const router = express.Router();
const { loadDotenv } = require('dotenv');
const { MongoClient } = require('db_connection');
const { csvToJson } = require('csv-file-creator');


// load_dotenv()
loadDotenv();

const CONNECTION_STRING = process.env.MONGO_DB_CON;
const UPLOAD_FOLDER = 'temp';
const ALLOWED_EXTENSIONS = new Set(['csv']);

function connection() {
  const client = new MongoClient(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.connect().then(() => {
    const db = client.db('ebDetails');
    const collection = db.collection('details');
    return collection;
  });
}

// routed functions
router.get("/eb/:year", async(req, res) => {
    const year = parseInt(req.params.year);
    const department = req.query.dept

    const result = await getData(year,department);
    if (!result){
        res.status(404).json({ error: "Data corresponding to search queries not found" });
    }else{
    res.json(result);
    }
});

router.get("/eb/current", async(req, res) =>{
    const department = req.query.dept;

    const result = await getCurrentEB(department);
    if (!result){
        res.status(404).json({ error: "Data corresponding to search queries not found" });
    }else{
        res.json(result);
    }
});


router.delete("/eb/delete_date", async(req,res) => {
    const key = req.query.key;
    const year = parseInt(req.query.year);

    if (key != process.env.API_KEY){
        res.status(401).json({error: "Unauthorized: Invalid API Key"});
    }else{
        const result = await deleteData(year);
        if (result.status === "fail"){
            res.status(400).json(result);
        }else{
            res.json(result);
        }
    }
});

// Set up multer middleware for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${file.fieldname}-${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ALLOWED_EXTENSIONS.includes(ext.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed`));
    }
  },
});

router.post('/add_data', upload.single('file'), async (req, res) => {
  const { key, year } = req.query;
  if (key !== process.env.API_KEY) {
    return res.status(401).send('Unauthorized: Invalid API Key');
  }
  if (!year) {
    return res
      .status(400)
      .send('Error: Please provide the year for which you want to upload EB details');
  }
  if (!req.file) {
    return res
      .status(400)
      .send('ERROR: File not found. Please upload a CSV file containing details');
  }
  try {
    const filePath = path.join(__dirname, '..', UPLOAD_FOLDER, req.file.filename);
    const result = await csvToJson().fromFile(filePath);
    // Call your function to process the uploaded data here
    return res.send(result);
  } catch (err) {
    return res.status(400).send('ERROR: Failed to process the uploaded file');
  }
});

module.exports = router;