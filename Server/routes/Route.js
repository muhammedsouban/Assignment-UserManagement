import express from "express";
const Route = express.Router()
import * as adminController from '../controller/controller.js'
import {verifyToken} from '../middleware/Auth.js'
import { upload } from "../middleware/multer.js";

Route.get('/users',verifyToken,adminController.getUsers)
Route.post('/users',verifyToken,upload.single('image'),adminController.createUser)

Route.post('/login', adminController.adminLogin)
Route.delete('/deleteUser/:id',verifyToken,adminController.deleteUser)
Route.get('/editUser/:id',verifyToken,adminController.editUser)
Route.put('/updateUser/:id',verifyToken,upload.single('image'),adminController.UpdateUser)

export default Route