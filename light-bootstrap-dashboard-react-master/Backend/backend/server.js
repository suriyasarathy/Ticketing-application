const express = require("express")
const bodyParser =require("body-parser")
const cors =require("cors")
const app =express();
  const path = require("path")
const Routes =require('./routes/router')
const sev =require("../backend/sev")
const http =require("http")
const {Server} =require("socket.io")
const { GmailProcess }=require('./controllers/gmailTickets/GmailController')

const { socketHandler } = require("./controllers/CommentSection/socketHandler"); // Import socket logic

const server =http.createServer(app);
const io =new Server(server,{
  cors:{
    origin: "*",
    methods: ["GET", "POST"],
  },
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/',Routes);
// console.log(GmailProcess())
socketHandler(io);





// app.get("/",(req,res)=>{
//   const result =GmailProcess();
//   console.log(result);
  
//   res.send(result)
// })
// Run the script when index.js is executed

// app.use('/',sev);
const port =3000
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
