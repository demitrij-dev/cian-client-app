import {INewEstateObject} from "@/app/Service/Interfaces/INewEstateObject";
import axios from "axios";

class ItemsPost{
    async addOne(item: INewEstateObject){
        return await axios.post("https://cian-server-app.onrender.com/data/estate", item)
    }
}
export default new ItemsPost()