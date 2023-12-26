"use client"
import React, {useState} from 'react';
import cl from "./page.module.scss"
import PhotosCarousel from "@/app/search/[id]/widgets/photosCarousel";
import Image from "next/image";
import {INewEstateObject} from "@/app/Service/Interfaces/INewEstateObject";
import AddPhotoCarousel from "@/app/create/widgets/addPhotoCarousel/addPhotoCarousel";
import ItemsPost from "@/app/Service/ItemsPost/ItemsPost";
import {useRouter} from "next/navigation";
import PopUp from "@/app/UIComponents/PopUp/PopUp";

const Page = () => {
    const {replace} = useRouter()
    const [activeCategory, setActiveCategory] = useState("sale")
    const [activeType, setActiveType] = useState("flat")
    const [item, setItem] = useState<INewEstateObject>({
        title: "",
        price: 0,
        address: "",
        contacts: "",
        type_of_rental: activeCategory,
        type_of_estate: activeType,
        description: "",
        photos: [],
        square: 1,
        rooms: [1],
        flor: 1,
    })
    const [infoStorage, setInfoStorage] = useState([
        {
            picture: "https://cdn-p.cian.site/imgmobile/icons/offer_card/plan.svg",
            title: "Кол-во комнат",
            info: 0,
            input: "rooms",
        },
        {
            picture: "https://cdn-p.cian.site/imgmobile/icons/offer_card/size.svg",
            title: "Общая площадь",
            info: 0,
            input: "square",
        },
        {
            picture: "https://cdn-p.cian.site/imgmobile/icons/offer_card/floor.svg",
            title: "Этаж",
            info: 0,
            input: "flor",
        },
    ]);
    const handleSendItem = async () => {
        await ItemsPost.addOne(item)
        replace("/")
    }
    const handleAddPhoto = () => {
        const link = prompt("Вставть ссылку на фото") || ""
        if(link.length && isValidURL(link)) setItem({...item, photos: [...item.photos, link]})
        function isValidURL(url: string) {
            const urlPattern = new RegExp(
                /^(ftp|http|https):\/\/[^ "]+$/i
            );
            return urlPattern.test(url);
        }
    }
    return (
        <div className={cl.cardPageWrapper}>
            <div className={cl.cardPage}>
                <section className={cl.mainSection}>
                    <div className={cl.headerSection}>
                        <input
                            className={cl.inputTitle}
                            type="text" placeholder="Название"
                            onChange={(e) => setItem({...item, title: e.target.value})}
                            value={item.title}
                        />
                        <input
                            className={cl.inputAddress}
                            type="text" placeholder="Адрес"
                            onChange={(e) => setItem({...item, address: e.target.value})}
                            value={item.address}
                        />
                    </div>
                    <AddPhotoCarousel photos={item.photos} width={990} height={670} handleAddPhoto={handleAddPhoto}/>
                    <div className={cl.aboutSection}>
                        <div className={cl.info}>
                            {infoStorage.map((option) => (
                                <div key={option.title} className={cl.infoItem}>
                                    <Image src={option.picture} alt="" width={50} height={50} />
                                    <div>
                                        <h2>{option.title}</h2>
                                        <input
                                            className={cl.inputOption}
                                            type="number"
                                            //@ts-ignore
                                            value={item[option.info]}
                                            onChange={(e) => setItem({ ...item, [option.input]: e.target.value })}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <textarea
                                rows={5}
                                cols={5}
                                className={cl.inputAddress}
                                placeholder="Описание"
                                onChange={(e) => setItem({...item, description: e.target.value})}
                                value={item.description}
                            />
                        </div>
                    </div>
                </section>
                <aside className={cl.asideBox}>
                    <input
                        className={cl.inputTitle}
                        type="number" placeholder="Цена"
                        onChange={(e) => setItem({...item, price: +e.target.value})}
                        value={item.price > 0 ? item.price : ""}
                    />
                    <div>
                        <div className={cl.buttonCheck}>
                            <button className={activeType === "flat" ? cl.active : ""} onClick={() => setActiveType("flat")}>Квартира</button>
                            <button className={activeType === "house" ? cl.active : ""} onClick={() => setActiveType("house")}>Коттедж</button>
                        </div>
                        <div className={cl.buttonCheck}>
                            <button className={activeCategory === "sale" ? cl.active : ""} onClick={() => setActiveCategory("sale")}>Продать</button>
                            <button className={activeCategory === "rent" ? cl.active : ""} onClick={() => setActiveCategory("rent")}>Сдать</button>
                        </div>
                    </div>
                    <input
                        className={cl.inputContacts}
                        type="text" placeholder="Контакт"
                        onChange={(e) => setItem({...item, contacts: e.target.value})}
                        value={item.contacts}
                    />
                    <button onClick={() => handleSendItem()}>Создать объявление</button>
                </aside>
            </div>
        </div>
    );
};

export default Page;