const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('./authMiddleware');
const isAdmin = require('./adminMiddleware');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const mongoURI = 'mongodb://127.0.0.1:27017/hey'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// ---------- Schema Definitions ----------

const subjectSchema = new mongoose.Schema({
    year: String,
    semester: String,
    department: String,
    subject: String
});

const resultSchema = new mongoose.Schema({
    indexNo: String,
    subject: String,
    department: String,
    marks: Number,
    status: String,
});

const noteSchema = new mongoose.Schema({
    userId: String,
    email: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
});

// Admin schema to store admin email
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
});

// Models
const Subject = mongoose.model('Subject', subjectSchema);
const Result = mongoose.model('Result', resultSchema);
const Note = mongoose.model('Note', noteSchema);
const Admin = mongoose.model('Admin', adminSchema);

// ---------- Middleware ----------
// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
    const { email } = req.body; // The email of the user attempting to add an admin

    // Look for this email in the Admin collection
    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(403).json({ message: 'You are not authorized to access this resource' });
    }

    next();
};

// ---------- Routes ----------

// Route to add the initial admin manually
app.post('/api/admin/initialAdmin', async (req, res) => {
    const { email } = req.body; // Email to be set as the initial admin

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ email });
    await newAdmin.save();
    res.status(201).json({ message: 'Initial admin added successfully' });
});

// Route to add a new admin (with authorization check)
app.post('/api/admin/addAdmin', checkAdmin, async (req, res) => {
    const { newAdminEmail } = req.body;

    const existingAdmin = await Admin.findOne({ email: newAdminEmail });
    if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ email: newAdminEmail });
    await newAdmin.save();

    res.status(200).json({ message: 'New admin added successfully' });
});

// Save a new subject
app.post('/api/admin/saveSubject', async (req, res) => {
    const { year, semester, department, subject } = req.body;
    const newSubject = new Subject({ year, semester, department, subject });

    try {
        await newSubject.save();
        res.status(200).send('Subject saved successfully');
    } catch (error) {
        console.error('Error saving subject:', error);
        res.status(500).send('Failed to save subject');
    }
});

// Get subjects based on filters
app.get('/api/admin/getSubjects', async (req, res) => {
    const { year, semester, department } = req.query;

    if (!year || !semester || !department) {
        return res.status(400).json({ error: 'Missing query parameters' });
    }

    try {
        const subjects = await Subject.find({ year, semester, department });
        if (subjects.length === 0) {
            return res.status(404).json({ error: 'No subjects found' });
        }
        res.json(subjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Save multiple student results
app.post('/api/admin/saveResults', async (req, res) => {
    const students = req.body;
    try {
        await Result.insertMany(students);
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Failed to save data');
    }
});

// Get results for a specific student
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

// Add a new note
app.post('/notes', async (req, res) => {
    const { userId, email, content } = req.body;
    const newNote = new Note({ userId, email, content });

    try {
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).send('Failed to save note');
    }
});

// Get notes for a specific user
app.get('/notes/:email', async (req, res) => {
    try {
        const notes = await Note.find({ email: req.params.email });
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Failed to fetch notes');
    }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send('Failed to delete note');
    }
});

// ---------- File Upload Feature ----------

// Define schema for the file metadata
const fileSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
  fileType: String,
});

// Create model
const File = mongoose.model('File', fileSchema);

// Set up file storage using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Creating unique filename
  },
});

const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });
    await newFile.save();
    res.status(200).json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Route to fetch all uploaded files
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// ---------- Server ----------
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
