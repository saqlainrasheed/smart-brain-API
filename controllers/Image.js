const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '106ccae873494f6ba5db682e6bbcc18e'
 });
 
 const handleApiCall =(req,res)=>{
   app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with api..'))
 }

const handleImage =(req,res,db)=>{
  const { id } = req.body;
  db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err=>res.status(400).json('Something went wrong.'));
}

module.exports={
  handleImage:handleImage,
  handleApiCall:handleApiCall
}