const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery",false);

const app = express();
// http에서 Body를 파싱
app.use(bodyParser.json());
app.listen(3000, async () => {
    console.log("Server started");
    const mongodbUri = "mongodb://127.0.0.1:27017";
    mongoose
        .connect(mongodbUri, { useNewUrlParser: true })
        .then(console.log("connected to mongo"))
        .catch((err) => console.error("Error connecting to mongo:", err));
});


app.get("/person", async (req, res) => {
    const person = await Person.find({});
    res.send(person);
});

app.get("/person/:email", async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
});

// Data append
app.post("/person", async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});


app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    console.log(person);
    res.send(person);
});

//Person data delete
app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});
