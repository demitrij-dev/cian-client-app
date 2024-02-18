"use client"
import React, {useEffect, useState} from 'react';
import {useSearchParams} from "next/navigation";
import ItemsRequest from "@/app/Service/ItemsRequest/ItemsRequest";
import {IQuery} from "@/app/Service/ItemsRequest/IterfaceItem";
import Filters from "@/app/search/widgets/filters/filters";
import cl from "./page.module.scss"
import {ICardItem} from "@/app/Service/Interfaces/ICardItem";
import CardItem from "@/app/search/widgets/cardItem/cardItem";
import {Metadata} from "next";
import Loader from "@/app/UIComponents/Loader/Loader";

// Страница отображения товаров
const Page = () => {
    // Состояние загрузки
    const [isLoading, setIsLoading] = useState(true)
    // Состояние коллекции товаров
    const [items, setItems] = useState<ICardItem[]>([])
    // Получение параметров из адреса
    const params = useSearchParams()
    // Запрос на сервер
    useEffect(() => {
        // Формирование запроса
        const query: IQuery = {
            type_of_estate: params.get("type_of_estate")?.trim() || "flat",
            type_of_rent: params.get("type_of_rent")?.trim() || "",
            rooms: params.get("rooms")?.trim()?.split(",") || ["1", "2", "3", "4", "5"],
            min_price: params.get("min_price")?.trim() || `0`,
            max_price: params.get("max_price")?.trim() || `${Number.MAX_SAFE_INTEGER}`,
            name: params.get("name")?.trim() || ""
        }
        // Обращение к сервису
        const req = async (query: any) => setItems(await ItemsRequest.getFilteredItems(query))
        req(query).then(() => setIsLoading(false))
    }, [params])
    return (
        <div className={cl.SearchPageWrapper}>
            {isLoading ?
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "1em"}}>
                    <Loader/>
                </div>
                :
                <div className={cl.SearchPage}>
                    <div className={cl.SearchPageContent}>
                        {items.map((item: ICardItem) => (
                            <CardItem key={item._id} item={item}/>
                        ))}
                        {!items.length && <h1 className={cl.notFoundText}>Ничего не нашли! :(</h1>}
                    </div>
                </div>
            }
        </div>
    );
};

export default Page;
