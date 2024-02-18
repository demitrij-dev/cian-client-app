import {IQuery} from "@/app/Service/ItemsRequest/IterfaceItem";
import axios from "axios";

// Сервис получения товаров с сервера
class ItemsRequest{
    // Асинхронный метод, формирует запрос из обьекта с фильтрами
    async getFilteredItems(filters: IQuery) {
        const response = await axios.get('https://cian-server-app.onrender.com/data/estate', {
            // http://localhost:8080/data/estate
            params: {
                type_of_estate: filters.type_of_estate || '',
                type_of_rental: filters.type_of_rent || '',
                min_price: filters.min_price || '',
                rooms: filters.rooms ? filters.rooms.join(',') : "",
                max_price: filters.max_price || '',
                address: filters.name || '',
            },
        })
        return response.data
    }
    // Асинхронный метод, возвращает товар по id
    async getOneItem(id: string){
        const response = await axios.get(`https://cian-server-app.onrender.com/data/estate/${id}`)
        // http://localhost:8080/data/estate/${id}
        return response.data
    }
}
export default new ItemsRequest()