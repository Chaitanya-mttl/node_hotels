const express = require('express');
const router = express.Router();
const Person = require('../person'); //D:\Full stack\Backend\Lecture_5\person.js

// Post route to add person 
router.post('/', async(req, res) =>{
    try {
        const data = req.body;

        // creare a new person document using the mongoose shell
        const newPerson = new Person(data);

        const Response = await newPerson.save()
        console.log("Data saved"); 
        res.status(200).json(Response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})



// Get method to get the person
router.get('/', async(req, res) =>{
    try {
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})


router.get('/:workType', async(req,res)=>{

    try {
        const workType = req.params.workType; // Extract the work type from the URL Parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "Invalid work type"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }

})

router.put('/:id', async(req, res) =>{
    try{
        const personId = req.params.id; // Extract the Id from the URL parameter
        const UpdatedPersonData = req.body; // Update the data for a person

        const response = await Person.findByIdAndUpdate(personId, UpdatedPersonData, {
            new : true, //Return the updated document
            runValidators: true, //Run Mongoose Validation
        })

        if(!response){
            return res.status(404).json({error: 'Person Not Fpund'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})


router.delete('/:id', async(req, res) =>{
    try {
        const personId = req.params.id; // Extract the Id from the URL parameter

        // Assuming you have a Person MOdel
        const response = await Person.findByIdAndRemove(personId);

        if(!response){
            return res.status(404).json({error: 'Person Not Fpund'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'person deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})


module.exports = router;