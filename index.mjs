import express from "express";

const app = express();
const PORT = 3000;
const USERS = [
    { id : "1", username : "nilesh", displayName : "Nilesh Gautam"},
    { id : "2", username : "aman", displayName : "Aman Kumar"},
    { id : "3", username : "ankur", displayName : "Ankur Gautam"},
    { id : "4", username : "manish", displayName : "Manish Kumar"},
]

app.get("/", (req, res)=>{
    res.status(201).send(USERS[0]);
})

app.get("/api/users", (req, res)=>{
    res.status(200).send(USERS);
})

app.get("/api/products", (req, res)=>{
    res.status(200).send({ id : "1", name : "Chicken Breast", price : "10.99"});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
})