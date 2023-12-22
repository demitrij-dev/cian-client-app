import React, {useState} from 'react';
import {ICardItem} from "@/app/Service/Interfaces/ICardItem";
import cl from "./cardItem.module.scss"
import Image from "next/image";
import {useRouter} from "next/navigation";

const CardItem = ({item}: {item: ICardItem}) => {
    const {push} = useRouter()
    const [activePhoto, setActivePhoto] = useState(0)
    const formatToPrice = (n: number) => {
        return new Intl.NumberFormat('ru-RU',
            {style: 'currency', currency: 'RUB', maximumSignificantDigits: 9}
        ).format(
            +n.toFixed(2),
        )
    }
    const handleSwitchToCardPage = () => {
        push(`search/${item._id}`)
    }
    return (
        <div className={cl.cardItem} onClick={handleSwitchToCardPage}>
            <div className={cl.photos}>
                <div className={cl.mainPhoto} style={{backgroundImage:`url(${item.photos[activePhoto]})`}} onClick={e => e.stopPropagation()}>
                    <button className={cl.photosLButton} onClick={() => setActivePhoto((activePhoto - 1 + item.photos.length) % item.photos.length)}>
                        <Image src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="" width={20} height={20}/>
                    </button>
                    <button className={cl.photosRButton} onClick={() => setActivePhoto((activePhoto + 1) % item.photos.length)}>
                        <Image src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="" width={20} height={20}/>
                    </button>
                    <div className={cl.text}>{activePhoto + 1}/{item.photos.length}</div>
                </div>
                <div className={cl.photosLine}>
                    <div className={cl.photo} style={{backgroundImage:`url(${item.photos[(activePhoto + 1) % item.photos.length]})`}}></div>
                    <div className={cl.photo} style={{backgroundImage:`url(${item.photos[(activePhoto + 2) % item.photos.length]})`}}></div>
                    <div className={cl.photo} style={{backgroundImage:`url(${item.photos[(activePhoto + 3) % item.photos.length]})`}}></div>
                </div>
            </div>
            <div className={cl.info}>
                <div style={{minHeight: "18%"}}>
                    <h1>{item.title}</h1>
                </div>
                <div style={{height: "60%"}}>
                    <h2>{item.address}</h2>
                    <h3>{formatToPrice(+item.price)}{item.type_of_rental === "rent" ? "/мес." : ""}</h3>
                    <h4>{formatToPrice(+item.price / +item.square)}/м²</h4>
                </div>
                <div style={{height: "20%"}}>
                    <h5>{item.description.slice(0, 210)}{item.description.length > 210 && "..."}</h5>
                </div>
            </div>
            <div className={cl.contacts}>
                <button>{item.contacts}</button>
            </div>
        </div>
    );
};

export default CardItem;