const Student = require("./models/Student");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Entry = require("./models/Entry");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// ================= REGISTER STUDENT =================
app.post("/register", async (req, res) => {
  try {
    const { name, rollNo, roomNo } = req.body;

    const newStudent = new Student({
      name,
      rollNo,
      roomNo
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student Registered Successfully",
      student: newStudent
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= ENTRY CHECK ROUTE =================
app.post("/entry", async (req, res) => {
  try {
    const { studentId } = req.body;

    // IMPORTANT: rollNo se match karna hai
    const student = await Student.findOne({ rollNo: studentId });

// ================= ENTRY HISTORY ROUTE =================
app.get("/history", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ entryTime: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching history" });
  }
});

if (student) {

  const newEntry = new Entry({
    name: student.name,
    rollNo: student.rollNo,
    roomNo: student.roomNo
  });

  await newEntry.save();

  res.send("Entry Allowed ✅ (Entry Recorded)");
}
    else {
      res.send("Student Not Found ❌");
    }

  } catch (error) {
    res.status(500).send("Error Occurred");
  }
});


// ================= MONGODB CONNECT =================
mongoose.connect("mongodb://127.0.0.1:27017/hostelDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});