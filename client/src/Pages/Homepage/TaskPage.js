import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, USERLOGINSUCCESS } from '../../Actions/userActions';
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { createTaskAction, deleteTaskAction, listTasks, updateTaskAction } from '../../Actions/taskAction';

const TaskPage = () => {
  const taskList = useSelector((state) => state.taskReducer);
  const { taskListarray, loading } = taskList;
  const titleInputRef = useRef()
  const contentInputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)
  const checkcookie = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/user/checkcookie",
      { withCredentials: true, credentials: "include" }
    );
    if (!data) {
      dispatch(USERLOGINSUCCESS(data))
      navigate("/")
    }
  }
  useEffect(() => {
    dispatch(listTasks())
    checkcookie();
  }, [])

  const addTask = () => {
    const TaskTitlevalue = titleInputRef.current.value
    const TaskContentvalue = contentInputRef.current.value
    if(TaskContentvalue.trim.length===0) return
    if(TaskTitlevalue.trim.length===0) return
    if(selectedId===null){
      dispatch(createTaskAction(TaskTitlevalue, TaskContentvalue));
      titleInputRef.current.value = ""
      contentInputRef.current.value = ""
    }

    else{
      dispatch(updateTaskAction(selectedId,TaskTitlevalue, TaskContentvalue))
      titleInputRef.current.value = ""
      contentInputRef.current.value = ""
      setSelectedId(null)
    }
  }

  const updateTask = (id)=>{
    const selectedTask = taskListarray.find(task => task._id===id)
    titleInputRef.current.value = (selectedTask&&selectedTask.title)||""
    contentInputRef.current.value = (selectedTask&&selectedTask.content)||""
    setSelectedId(id)
  } 

  return (
    <>
      <Box w={"100%"} height="100vh" display={"flex"} flexDirection="column" background={"#44CCFF"} >
        <Box background={"cyan"} w={"100%"} h="50px" lineHeight={"50px"}  color="white" display={"flex"} alignItems="center">
          <Box w={"70%"} h="100%" margin={"auto"} display="flex"alignItems="center" >
          <Heading marginleft="100px" marginRight={"auto"}>Your Task List</Heading>
          <Button color={"gray"} onClick={()=>{
            dispatch(logout())
            navigate("/")
          }}>Logout</Button>
          </Box>
        </Box>
        <Box w={"50%"} display={"flex"} flexDirection="column" justifyContent={"center"} textAlign={"center"} m="auto" marginTop={"20px"}>
          <Box w="100%" display={"flex"} flexDir={"column"}>
            <Input placeholder="Enter task title" ref={titleInputRef} marginBottom="20px" color={"white"}/>
            <Input placeholder="Enter task content" ref={contentInputRef} marginBottom="20px" color={"white"} />
            <Button type='submit' w={"30%"} m={"auto"} color="gray" onClick={() => addTask()}>{selectedId===null?"ADD":"UPDATE"}</Button>
          </Box>
          <Box w={"100%"}>
            {
              taskListarray.length!==0 ?
                taskListarray.map((task) => {
                  return (
                    <Box key={task._id} flex='1' textAlign='left' display={"flex"} flexDir={"column"} width={"100%"} h={"80px"} 
                    background="cyan" marginTop={"20px"} p={"5px"} color="white" borderRadius={"10px"} paddingLeft="20px" >
                      <Box display={"flex"} justifyContent="space-between">
                        {task.title}
                        <Box display={"flex"} >
                          <Button color="gray" marginTop={"8px"} marginRight="5px"  h={"30px"} p={3} onClick={()=>updateTask(task._id)}>Update</Button>
                          <Button color="gray"marginTop={"8px"} marginRight="10px" h={"30px"} p={3} onClick={()=>dispatch(deleteTaskAction(task._id))}>Delete</Button>
                        </Box>
                      </Box>
                      <Box>
                        {task.content}
                      </Box>
                    </Box>

                  )
                }) : <Box marginTop={"20px"} color={"white"}>
                  <p>No task to show</p>
                  </Box>

            }
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default TaskPage