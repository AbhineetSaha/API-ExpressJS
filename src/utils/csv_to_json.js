const csv = require('csv');
const fs = require('fs')

const connection = require('../routes/eb_details/db_connection');

function csvTojson(csvFile, year) {
    let jsonData = {};
    let positionData = {};
    const hierarchyOrder = {
        "Admin Department": [
            "Club Coordinator",
            "Community Leader",
            "President",
            "Director",
            "Chairman",
            "Treasurer",
            "Vice President",
            "Secretary",
            "Head of public relations",
            "Track lead",
            "HR Lead",
        ],
        "Event Department": [
            "Event lead",
            "Social Media Lead",
            "Organizer",
        ],
        "Tech Department": [
            "Technical Lead",
            "Developer",
        ],
        "Design Team": [
            "Head of marketing",
            "Chief Editor",
            "Head of videography",
            "Documentation Specialist",
            "Designer",
        ],
    }
    let AllPositions = [];
    
    const All_positions = [];
    for (const [key, value] of Object.entries(hierarchy_order)) {
    for (let i of value) {
        All_positions.push(i.charAt(0).toUpperCase() + i.slice(1));
        }
    }
    fs.readFile(csvFile, "utf-8", (err, data) => {
        if (err) throw err;
        const csvReader = data.split("\n").slice(1).map(row => {
          const columns = row.split(",");
          return {
            Position: columns[0].trim()
            // add other columns as needed
            };
        });
    });
    const position_data = {};
    for (const position of All_positions) {
      for (const row of csvReader) {
        const key = row.Position.charAt(0).toUpperCase() + row.Position.slice(1);
        if (key.includes(position)) {
          if (position_data[key]) {
            position_data[key].push(row);
          } else {
            position_data[key] = [row];
          }
        }
      }
    }
    for (const key of Object.keys(json_data)) {
      json_data[key] = json_data[key].map(row => {
        delete row.Position;
        // delete other columns as needed
        return row;
      });
    }
    const dept_list = Object.keys(hierarchy_order);
    for (const dept of dept_list) {
      json_data[dept] = {};
      for (const [position, value] of Object.entries(position_data)) {
        for (const hierarchy_position of hierarchy_order[dept]) {
          if (position.includes(hierarchy_position)) {
            json_data[dept][position] = value;
          }
        }
      }
    }
    json_data.Year = year;
    // const jsonFile = "temp/temp_json_file.json";
    // fs.writeFile(jsonFile, JSON.stringify(json_data, null, 4), (err) => {
    //   if (err) throw err;
    // });
    fs.unlink(csvFile, (err) => {
      if (err) throw err;
    });
    return addContent(json_data, year);
}
