"use client";
import React, {FC, useState} from 'react';
import cl from "./findOptions.module.scss";
import {IParameters} from "@/app/Service/Interfaces/filterParametersUtility";
import {useRouter} from "next/navigation";

// Виджет для запроса по фильтрам
const FindOptions: FC = () => {
    const {push} = useRouter()
    // Состояние параметров фильтрации
    const [parameters, setParameters] = useState<IParameters>({
        type_of_estate: "flat",
        type_of_rent: "sale",
        rooms: ["1", "2", "3", "4", "5"],
        min_price: "",
        max_price: "",
        name: "",
    })
    // Изменение поля в параметрах фильтрации
    const handleParametersChange = (field: string, value: string) => {
        if (field === 'type_of_rent') {
            setActiveCategory(parseInt(value, 10));
            setParameters({
                ...parameters,
                type_of_rent: value === '0' ? "sale" : "rent",
            });
        } else {
            setParameters({ ...parameters, [field]: value });
        }
    };
    // Изменение поля кол-ва комнат в товаре
    const handleChangeRoomsFilter = (room: string) => {
        if(parameters.rooms.includes(room)){
            return setParameters({...parameters, rooms: [...parameters.rooms.filter(r => r !== room)]})
        }
        return setParameters({...parameters, rooms: [...parameters.rooms, room]})
    }
    // Переадресация на страницу с параметрами фильтрации
    const handleSearch = () => {
        const query = `
            &type_of_estate=${parameters.type_of_estate}
            &type_of_rent=${parameters.type_of_rent}
            &min_price=${parameters.min_price}
            &rooms=${parameters.rooms.join(",")}
            &max_price=${parameters.max_price}
            &name=${parameters.name}
        `
        push(`/search?${query}`)
    }
    // Состояния дополнительных окон в виджете
    const [customSelectActive, setCustomSelectActive] = useState(false)
    const [customCategoryActive, setCustomCategoryActive] = useState(false)
    const [activeCategory, setActiveCategory] = useState(0)
    const categories = ["Купить", "Снять"]
    const rooms = ["1", "2", "3", "4"]
    // Форматирование числа к виду стоимости
    const formatToPrice = (n: number) => {
        return new Intl.NumberFormat('ru-RU',
            {style: 'currency', currency: 'RUB', maximumSignificantDigits: 9}
        ).format(
            +n,
        )
    }
    return (
        <div className={cl.findNav}>
            <div className={cl.findOptions}>
                <h1>Эксклюзивные акции на новостройки</h1>
                <div className={cl.findSettings}>
                    <div className={cl.findButtons}>
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(() => index)
                                    handleParametersChange("type_of_rent", index.toString())
                                }}
                                className={activeCategory === index ? cl.buttonActive : ""}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className={cl.findSelects}>
                        {activeCategory === 0 && (
                            <div
                                className={cl.customSelect}
                                onClick={() => {
                                    setCustomCategoryActive(() => !customCategoryActive)
                                    setCustomSelectActive(() => false)
                                }}
                                style={customCategoryActive ? {color: "#2b87db"} : {}}
                            >
                                Строение
                                {customCategoryActive &&
                                    <div className={cl.customSelectDiv} onClick={(e) => e.stopPropagation()}>
                                        <h3
                                            style={{color: parameters.type_of_estate === "house" ? "#2b6edb" : "black"}}
                                            onClick={() => handleParametersChange("type_of_estate", "house")}
                                        >
                                            Дом
                                        </h3>
                                        <h3
                                            style={{color: parameters.type_of_estate === "flat" ? "#2b6edb" : "black"}}
                                            onClick={() => handleParametersChange("type_of_estate", "flat")}
                                        >
                                            Квартира
                                        </h3>
                                    </div>
                                }
                            </div>
                        )}
                        {activeCategory === 1 && (
                            <div
                                className={cl.customSelect}
                                onClick={() => {
                                    setCustomCategoryActive(() => !customCategoryActive)
                                    setCustomSelectActive(() => false)
                                }}
                                style={customCategoryActive ? {color: "#2b87db"} : {}}
                            >
                                Строение
                                {customCategoryActive &&
                                    <div className={cl.customSelectDiv} onClick={(e) => e.stopPropagation()}>
                                        <h3
                                            style={{color: parameters.type_of_estate === "house" ? "#2b6edb" : "black"}}
                                            onClick={() => handleParametersChange("type_of_estate", "house")}
                                        >
                                            Дом
                                        </h3>
                                        <h3
                                            style={{color: parameters.type_of_estate === "flat" ? "#2b6edb" : "black"}}
                                            onClick={() => handleParametersChange("type_of_estate", "flat")}
                                        >
                                            Квартира
                                        </h3>
                                    </div>
                                }
                            </div>
                        )}
                        <div
                            className={cl.customSelect}
                            onClick={() => {
                                setCustomCategoryActive(() => false)
                                setCustomSelectActive(() => !customSelectActive)
                            }}
                            style={customSelectActive ? {color: "#2b87db"} : {}}
                        >
                            Комнаты
                            {customSelectActive &&
                                <div className={cl.customSelectDiv} onClick={(e) => e.stopPropagation()}
                                >
                                    {rooms.map((room, index) =>
                                        <button
                                            key={index}
                                            style={{color: parameters.rooms.includes(room) ? "#2b87db" : "",
                                                    backgroundColor: parameters.rooms.includes(room) ? "#e9f3fb" : "",
                                                    cursor: "pointer"
                                            }}
                                            onClick={() => handleChangeRoomsFilter(room)}
                                        >
                                            {room}
                                        </button>
                                    )}
                                </div>
                            }
                        </div>
                        <div className={cl.customInputs}>
                            <input
                                type="number"
                                placeholder="От"
                                value={parameters.min_price}
                                onChange={(e) => handleParametersChange("min_price", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="До"
                                value={parameters.max_price}
                                onChange={(e) => handleParametersChange("max_price", e.target.value)}
                            />
                        </div>
                        <input
                            className={cl.customInput}
                            type="text"
                            placeholder="Город, адрес, метро, район, ж/д, шоссе или ЖК"
                            value={parameters.name}
                            onChange={(e) => handleParametersChange("name", e.target.value)}
                        />
                    </div>
                </div>
                <button className={cl.searchButton} onClick={handleSearch}>Поиск</button>
            </div>
        </div>
    );
};

export default FindOptions;
