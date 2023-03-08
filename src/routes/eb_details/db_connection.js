const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/your_database_name'; // Replace with your own database URI
const client = new MongoClient(uri, { useNewUrlParser: true });


require('dotenv').config(); // Load environment variables from .env file


function connection() {
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ebDetails");
    const collection = db.collection("details");
    return collection;
  });
}

function addContent(data,year){
    client.connect((err) => {
        if (err) throw err;
        const collection = client.db("your_database_name").collection("your_collection_name"); // Replace with your own collection name
        collection.countDocuments({"Year" : year}, (err, count)=>{
            if (err) throw err;
            if (count === 0){
                collection.insertOne(data , (err,count)=>{
                    if(err) throw err;
                    console.log(result);
                    client.close();
                })
            }else{
                collection.updateOne(
                    {"Year":year},
                    {
                        $set: {
                            "Admin Department": data["Admin Department"],
                            "Event Department": data["Event Department"],
                            "Tech Department": data["Tech Department"],
                            "Design Team": data["Design Team"],
                        }
                    }, (err, count) =>{
                        if (err) throw err;
                        console.log(result);
                        client.close();
                    })
            }
        })
    })
    return {"status": "success"}
}

function deleteData(year){
    client.connect((err) => {
        if (err) throw err;
        const collection = client.db("your_database_name").collection("your_collection_name");
        collection.deleteOne({"Year": year}, (err,count) => {
            if (err){
                console.log(err);
                client.close();
                return {"status": "fail", "message": "Year not found"}, 400;
            }else{
                console.log(result);
                client.close();
                return {"status": "success", "message": "Data deleted"}
            }
        })
    })
}

function getData(year, department){
    client.connect((err) => {
        if (err) throw err;
        const collection = client.db("your_database_name").collection("your_collection_name");
        const date = collection.deleteOne({"Year": year},(err,count) => {
            if (err){
                console.log(err);
                client.close();
                return False
            }else{
                delete data["_id"]
                if (!department == None){
                    department = department.replace("-", " ")
                    department = department.title()
                    data = data[department]
                }
            }
            data = json.loads(json_util.dumps(data))
            return data
        })
    })

}

function getCurrentEB(department) {
  client.connect((err) => {
    if (err) throw err;
    const collection = client.db("your_database_name").collection("your_collection_name"); // Replace with your own collection name
    collection.find({}).sort({ Year: -1 }).limit(1).toArray((err, latest) => {
      if (err) throw err;
      const year = latest[0].Year;
      const data = getData(year, department); // Assuming that the getData() function is defined elsewhere
      return data; // Or do something else with the data
      client.close();
    });
  });
}
