//import express and axios
import express from "express";
import axios from "axios";
import config from "./config.js";

//create an express app and set the port number
const app = express();
const port = 3000;
const API_url = "http://api.openweathermap.org/";
 

//use the public folder for static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//render the index.ejs file on homepage
app.get('/',(req,res)=>{
    res.render("index.ejs");
});
app.post("/submit",async(req,res)=>{

    const latNlon = await axios.get(`${API_url}geo/1.0/direct?q=${req.body.cityName}&limit=1&appid=${config.weatherKey}`);
    
    const lat = latNlon.data[0].lat;
    const lon = latNlon.data[0].lon;

    const result = await axios.get(`${API_url}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.weatherKey}`);

    res.render("index.ejs",{
        main: result.data.main ,
    });
});

//Listen to the predefine port and start the server
app.listen(port,()=>{
    console.log(`Listening to the port ${port}.`);
});