import express from "express";

const USERS = [
    { id : 1, username : "nilesh", displayName : "Nilesh Gautam"},
    { id : 2, username : "aman", displayName : "Aman Kumar"},
    { id : 3, username : "ankur", displayName : "Ankur Gautam"},
    { id : 4, username : "manish", displayName : "Manish Kumar"},
    { id : 5, username : "sandeep", displayName : "Sandeep Bera"},
    { id : 6, username : "kunal", displayName : "Kunal Pasi"},
    { id : 7, username : "shubham", displayName : "Shubham Singh"},
];

const PORT = 3000;


const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(201).send(USERS[0]);
});

app.get("/api/users", (req, res)=>{
    console.log(req.query);
    const {query : {filter, value}} = req;
    if(!filter && !value) return res.status(200).send(USERS);
    if(filter && value) return res.status(200).send(
        USERS.filter((user) => user[filter].includes(value))
    )
    res.status(400).send({Error : "Bad Request!"});
});

app.post("/api/users", (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id : USERS[USERS.length -1].id + 1, ...body };
    USERS.push(newUser);
    res.status(201).send(newUser);
})

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

app.put("/api/users/:id", (req, res) => {
    const { body, params : { id }} = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const userIndex = USERS.findIndex((user) => user.id === parsedId);
    if(userIndex == -1) return res.sendStatus(404);
    USERS[userIndex] = { id : parsedId, ...body };
    res.sendStatus(200);
})

app.patch("/api/users/:id", (req, res) => {
    const { body, params : { id }} = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const userIndex = USERS.findIndex((user) => user.id === parsedId);
    if(userIndex == -1) return res.sendStatus(404);
    USERS[userIndex] = { ...USERS[userIndex], ...body };
    res.sendStatus(200);
})

app.delete("/api/users/:id", (req, res) => {
    const { params : { id }} = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400); 
    const userIndex = USERS.findIndex((user) => user.id === parsedId);
    if(userIndex == -1) return res.sendStatus(404);
    USERS.splice(userIndex, 1);
    res.sendStatus(200);
})

app.get("/api/products", (req, res)=>{
    res.status(200).send({ id : "1", name : "Chicken Breast", price : "10.99"});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
});