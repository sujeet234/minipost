let express=require("express");
let cors = require("cors");
let app = express();
let axios = require("axios");
app.use(express.json());
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
        );
        res.header("Access-Control-Expose-Headers", "Authorization");
        res.header(
            "Access-Control-Allow-Header",
            "Origin, X-Requested-With,Content-Type,Accept"
        );
        next();
});
//process.env.PORT ||
const port =  2410;
app.listen(port,()=>console.log(`Listening on port ${port}`));


let url="";

app.get("/myServer",function(req,res){
    let baseURL=url;
    axios.get(baseURL).then((response)=>{
        let {data} = response;
        // console.log("myServer get ",data);
        res.send(data);
        // url="";
    })   
    .catch((err)=>{
        if(err.response){
        let {status,statusText} = err.response;
        res.status(status).send(statusText);
        }
        else {
            res.status(404).send(err);
        }
    })
})

app.get("/myServer/:id",function(req,res){
    let baseURL=url;
    // let id = req.params.id;
    axios.get(baseURL).then((response)=>{
        let {data} = response;
        console.log("myServer get ",data);
        // let arr = data.map((ele)=>ele.id == id)
        res.send(data);
        // url="";
    })   
    .catch((err)=>{
        if(err.response){
        let {status,statusText} = err.response;
        res.status(status).send(statusText);
        }
        else {
            res.status(404).send(err);
        }
    })
})

  
app.post("/urls",function(req,res){
    let body = req.body;
    url=body.url;
    console.log("new urls",url);    
})


app.post("/myServer",function(req,res){
    let body = req.body;
    let baseURL = url;
    axios.post(baseURL,body).then((response)=>{
        res.send(response.data);
        // console.log("post Data ",response.data);
    })
    .catch((err)=>{
        if(err.response){
        let {status,statusText} = err.response;
        console.log(err.response);
        res.status(status).send(statusText);
        }
        else {
            res.status(404).send(err);
        }
    })
})
