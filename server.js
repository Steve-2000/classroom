const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/hey'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Student schema
const resultSchema = new mongoose.Schema({
    indexNo: String,
    subject: String,
    department: String,
    marks: Number,
    status: String,
});

const Result = mongoose.model('Result', resultSchema);

// const dummyData=[{
//     "indexNo": "001",
//     "subject": "Mathematics",
//     "department": "Science",
//     "marks": 85,
//     "status": "Passed"
// }]
// Result.insertMany(dummyData)
//     .then(() => {
//         console.log("Dummy data inserted");
//         mongoose.connection.close();
//     })
//     .catch(err => {
//         console.error("Error inserting dummy data", err);
//     });



app.use(cors());
// Define the API endpoint
app.get('/api/results/:index', async (req, res) => {
    try {
        const results = await Result.find({ indexNo: req.params.index });
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send({ error: 'No data found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});



const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
