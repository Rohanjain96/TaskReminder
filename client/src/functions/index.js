import axios from "axios"
const url = "http://localhost:5000/Tasks/";
export const readTasks = async()=> {
    try {
       const {data} = await axios.get(url);
       return data;
    } catch (error) {
    } 
}

export const createTasks = async(newTasks) => {
    try {
        const {data} = await axios.post(url,newTasks);
        return data;
    }
    catch (error) {
        console.log(error);
    }
} 
export const updateTasks = async(id,newTasks) => {
    try {
         await axios.patch(`${url}/${id}`,newTasks);
        // return data;
    }
    catch (error) {
        console.log(error);
    }
} 
export const deleteTasks = async(id,) => {
    try {
        await axios.delete(`${url}/${id}`);
    }
    catch (error) {
        console.log(error);
    }
} 