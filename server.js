






const express=require("express")
const app =express()
const admin=require("firebase-admin")
const credentials = require("./key.json")


admin.initializeApp({
    credential:admin.credential.cert(credentials)
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const db = admin.firestore()

app.post('/createEmpData', async(req, res)=>{
    try{
        console.log(req.body)
        const empData={
            Age:req.body.Age,
            Company:req.body.Company,
            FullTime: req.body.FullTime,
            Name:req.body.Name,
            Role:req.body.Role,
            Salary:req.body.Salary
        };
        const response = await db.collection("Employee").add(empData)
        res.send(response)
    }
    catch(error){
        res.send(error)
    }
});

app.get('/read/all', async(req, res)=>{
    try{
        const empRef=db.collection("Employee")
        const response=await empRef.get();
        let responseArr=[];
        response.forEach(doc=>{
            responseArr.push(doc.data());
        });
        res.send(responseArr)
    }
    catch(error){
        res.send(error)
    }
})

app.get('/read/:id', async(req, res)=>{
    try{
        const empRef=db.collection("Employee").doc(req.params.id)
        const response=await empRef.get();
        res.send(response.data())
    }
    catch(error){
        res.send(error)
    }
})





const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`server listening at http://localhost:${PORT}`)
})


























