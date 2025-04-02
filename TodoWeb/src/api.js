import axios from "axios";

export const getTodos =async ()=>{
    const response = await axios.get("http://localhost:5138/api/todos")
    return response.data;
}