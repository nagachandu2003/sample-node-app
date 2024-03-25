const express = require("express");
const path = require("path");
const cors = require("cors");


const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json())
app.use(cors())
const dbPath = path.join(__dirname, "Employees.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const port = 3002;
    app.listen(port, () => {
      console.log(`Server Running at http://localhost:${port}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/", (req,res) => {
    res.send("Hello World");
})

app.get("/users",async (req,res) => {
    const query = 'SELECT * FROM login_users';
    let arr = []
    const response = await db.all(query);
    res.send(response);
    // db.query(query, (err,data) => {
    //     if(err){
    //         console.log(err);
    //         return res.json("Error Occurred");
    //     } else {
    //         for(let values of data)
    //         arr.push(values);
    //         return res.json(data); // Send JSON response
    //     }
    // });
});

app.post("/users", async (req,res) => {
    const {body} = req
    const {userinput,password} = body
    const que = `INSERT INTO login_users (username,password) values('${userinput}','${password}');`;
    const response = await db.run(que);
    res.send("User inserted Successfully");
    // db.query(que,(err,data) => {
    //     if(err){
    //         res.json("Error Occurred")
    //     }
    //     res.status(200).send("User inserted successfully");
    // })
});

app.put("/users",async (req,res) => {
    const {body} = req
    const {userinput,password} = body
    console.log(body);
    // console.log(body);
    // console.log("From Backend");
    const que = `UPDATE login_users set password='${password}' where username='${userinput}';`;
    const response = await db.run(que);
    res.send("Password Updated Successfully");
    // db.query(que,(err,data) => {
    //     if(err){
    //         res.json("Error Occurred")
    //     }
    //     res.status(200).send("Password Updated successfully");
    // })
});

app.delete("/users/:username", async (req, res) => {
    const { username } = req.params;
    console.log(username)
    const que = `DELETE FROM login_users WHERE username = '${username}';`;
    const response = await db.run(que);
    res.send("User Deleted Successfully");
    // db.query(que, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).send("Error deleting user");
    //     }
    //     return res.status(200).send("User deleted successfully");
    // });
});
// const express = require("express");

// const app = express()
// app.use(express.json())

// app.get("/", (req,res) => {
//     res.status(200).send("Hello I am Home Page");
// })

// app.listen(3002,() => {
//     console.log("Server is Running at http://localhost:/3002");
// })