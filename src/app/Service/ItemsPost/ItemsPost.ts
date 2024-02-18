import {INewEstateObject} from "@/app/Service/Interfaces/INewEstateObject";
import axios from "axios";

// Сервис добавления товара на сервер
class ItemsPost{
    // Асинхронный запрос на сервер
    async addOne(item: INewEstateObject){
        return await axios.post("https://cian-server-app.onrender.com/data/estate", item)
    }
}
export default new ItemsPost()