import express from "express";

const app = express();
const PORT = 3000;
const USERS = [
    { id : 1, username : "nilesh", displayName : "Nilesh Gautam"},
    { id : 2, username : "aman", displayName : "Aman Kumar"},
    { id : 3, username : "ankur", displayName : "Ankur Gautam"},
    { id : 4, username : "manish", displayName : "Manish Kumar"},
    { id : 5, username : "sandeep", displayName : "Sandeep Bera"},
];

app.get("/", (req, res)=>{
    res.status(201).send(USERS[0]);
});

app.get("/api/users", (req, res)=>{
    console.log(req.query);
    const {query : {filter, value}} = req;
    if(!filter && !value) return req.status(200).send(USERS);
    if(filter && value) return res.status(200).send(
        USERS.filter((user) => user[filter].includes(value))
    )
    res.status(400).send({Error : "Bad Request!"});
});

app.get("/api/users/:id", (req, res)=>{
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)) return res.status(400).send({ msg : "Bad Request, Invalid Id"});
    const findUser = USERS.find((user) => user.id === parsedId);
    console.log(findUser);
    if(!findUser) return res.sendStatus(404);
    return res.status(200).send(findUser);
});

app.get("/api/products", (req, res)=>{
    res.status(200).send({ id : "1", name : "Chicken Breast", price : "10.99"});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
});