const express = require("express"); 
const { readtasks, deletetask,updatetasks,createtasks}= require("../Controllers/taskController.js");
const { protect } = require("../Middleware/authenticate.js");
const router = express.Router();
router.get('/readtask',protect,readtasks);
router.post('/createtask',protect,createtasks);
router.patch('/:id',protect,updatetasks);
router.delete('/:id',protect,deletetask);
module.exports = router;