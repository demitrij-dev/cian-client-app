// Интерфейс параметров фильтрации
export interface IParameters{
    type_of_estate: string,
    type_of_rent: string,
    rooms: string[],
    min_price: string,
    max_price: string,
    name: string,
}