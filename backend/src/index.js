const expresss=require('express');

//inicailiacia servidor
const app=expresss();
const PORT=3000;

//ruta
app.get('/',(req,res)=>{
    res.send('ASDADASDASDASDAD');
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});