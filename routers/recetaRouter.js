import {Router} from "express";
import { getDB } from "../db/config.js";

const route = Router()

route.get("/getall", async function (req, res) {
    try{
        const recetas = await getDB().collection("recetas").find().toArray()
        res.status(200).json(recetas)
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
})


export default route;