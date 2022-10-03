const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

require('dotenv').config()

const PORT = 2353;

app.use(express.json());

app.listen(PORT, () => {
    console.log("Running");
})

app.get("/", (req, res) => {
    res.json({})
})

app.post("/api/posts", verifyToken, (req, res) => {


    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            return res.sendStatus(403);
        } else {
            res.json({
                message: "Post Created...",
                authData
            })
        }
    })
})

app.post("/api/login", (req, res) => {

    const user = {
        id: 1,
        userName: "Murtaza",
        password: "14E3EDD"
    }

    jwt.sign({ user: user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
        res.json({ token: token })
    });
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {

        const bearerToken = bearerHeader.split(" ");

        const bearer = bearerToken[1];

        req.token = bearer;

        next();
    } else return res.sendStatus(403);
}


// const posts = [
//     {
//         name: "JIM",
//         id: 1
//     }, {
//         name: "TIM",
//         id: 2
//     }, {
//         name: "HIM",
//         id: 3
//     },
//     {
//         name: "Ali",
//         id: 4
//     }
// ]
