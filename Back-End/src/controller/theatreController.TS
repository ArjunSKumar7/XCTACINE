import {Request,Response} from 'express';

const theatrecontroller={

    addMovie:async (req:Request,res:Response)=>{
        console.log("Add")
        console.log("Add",req.body)
    }

}

export default theatrecontroller;