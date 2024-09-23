import axios from "axios";
const server_url = import.meta.env.VITE_SERVER_URL;

export default function Stats() {
    let data = null;
    axios.get(`${server_url}/stats`)
    .then((res)=>{
        data = res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}