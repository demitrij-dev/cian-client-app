"use client"
import React, {useEffect, useState} from 'react';
import ItemsRequest from "@/app/Service/ItemsRequest/ItemsRequest";
import {ICardItem} from "@/app/Service/Interfaces/ICardItem";
import cl from "./page.module.scss"
import PhotosCarousel from "@/app/search/[id]/widgets/photosCarousel";
import Image from "next/image";
import Loader from "@/app/UIComponents/Loader/Loader";

// Страница товара
const Page = () => {
    const [isLoading, setIsLoading] = useState(true)
    // Состояние товара
    const [item, setItem] = useState<ICardItem>({
        __v: undefined,
        _id: undefined,
        address: "",
        contacts: "",
        description: "",
        flor: "",
        id: "",
        photos: [],
        price: "",
        rooms: [],
        square: "",
        title: "",
        type_of_estate: "",
        type_of_rental: ""
    })
    // Получение id из строки и обращение в сервис
    useEffect(() => {
        const query = window.location.href.split('/')
        const id = query.pop()
        const req = async (id: any) => setItem(await ItemsRequest.getOneItem(id))
        req(id).then(() => setIsLoading(false))
    }, [])
    // Форматирование числа к виду стоимости
    const formatToPrice = (n: number) => {
        return new Intl.NumberFormat('ru-RU',
            {style: 'currency', currency: 'RUB', maximumSignificantDigits: 9}
        ).format(
            +n,
        )
    }
    // Состояние дополнительной информации
    const [infoStorage, setInfoStorage] = useState([
        {
            picture: "https://cdn-p.cian.site/imgmobile/icons/offer_card/plan.svg",
            title: "Кол-во комнат",
            info: [...item.rooms]
        },
        {
            picture: "https://cdn-p.cian.site/imgmobile/icons/offer_card/size.svg",
            title: "Общая площадь",
            info: `${item.square}/м²`,
        },
        {
            picture: "https://cdn-p.cian.site/imgmobile/icons/offer_card/floor.svg",
            title: "Этаж",
            info: item.flor,
        }
    ])
    // Подгрузка дополнительной информации после запроса
    useEffect(() => {
        setInfoStorage(prevInfoStorage => [
            {
                ...prevInfoStorage[0],
                info: [...item.rooms],
            },
            {
                ...prevInfoStorage[1],
                info: `${item.square}/м²`,
            },
            {
                ...prevInfoStorage[2],
                info: item.flor,
            }
        ]);
    }, [item])
    // Состояние развернутого описания
    const [fullDescription, setFullDescription] = useState(false)
    // Состояние копирования
    const [wasCopy, setWasCopy] = useState(false)
    // Копирование номера из элемента
    const handleCopyClick = () => {
        navigator.clipboard.writeText(item.contacts).then()
        setWasCopy(true)
        setTimeout(() => setWasCopy(false), 1000)
    }
    // Отображение анимации загрузки
    if(isLoading){
        return (
            <div className={cl.cardPageWrapper}>
                <div className={cl.cardPage} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div>
                        <Loader/>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={cl.cardPageWrapper}>
            <div className={cl.cardPage}>
                <section className={cl.mainSection}>
                    <div className={cl.headerSection}>
                        <h1>{item.title}</h1>
                        <h2>{item.address}</h2>
                    </div>
                    <PhotosCarousel photos={item.photos} width={990} height={670}/>
                    <div className={cl.aboutSection}>
                        <div className={cl.info}>
                            {infoStorage.map(item => (
                                <div key={item.title} className={cl.infoItem}>
                                    <Image src={item.picture} alt="" width={50} height={50}/>
                                    <div>
                                        <h2>{item.title}</h2>
                                        <h1>{item.info}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cl.description} style={{maxHeight: fullDescription ? "50em" : "15em"}}>
                            {item.description}
                        </div>
                        {item.description.length > 1500 &&
                            <button onClick={() => setFullDescription(() => !fullDescription)}>
                                {fullDescription ? "Показать меньше" : "Показать больше"}
                            </button>
                        }
                    </div>
                </section>
                <aside className={cl.asideBox}>
                    <h1>{formatToPrice(+item.price)}{item.type_of_rental === "rent" ? "/мес." : ""}</h1>
                    <h2>{formatToPrice(+item.price / +item.square)}/м²</h2>
                    <button onClick={handleCopyClick}>{wasCopy ? "Cкопировано!" : "Контакты представителя"}</button>
                </aside>
            </div>
        </div>
    );
};

export default Page;
