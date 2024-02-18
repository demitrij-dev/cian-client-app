// Интерфейс обьекта с параметрами фильтрации
export interface IQuery{
    type_of_estate: string
    type_of_rent: string
    rooms: string[]
    min_price: string
    max_price: string
    name: string
}