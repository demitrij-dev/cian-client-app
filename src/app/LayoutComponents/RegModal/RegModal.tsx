"use client"
import cl from "./RegModal.module.scss"
import React, {useEffect, useState} from "react";
import Auth from "@/app/Service/Auth/Auth";
import {ICountry, IUserForm} from "@/app/Service/Interfaces/IUserUtility";
import {log} from "util";
import PopUp from "@/app/UIComponents/PopUp/PopUp";
import {createPortal} from "react-dom";

interface IClose{
    onClose: () => void
}
// Окно регистрации (Не используется)
const RegModal = ({onClose}: IClose) => {
    const [popUpText, setPopUpText] = useState(null);
    const countries: ICountry[] = [{name: "Россия", code: "7"}, {name: "США", code: "1"}, {name: "Китай", code: "3"}]
    const [userForm, setUserForm] = useState<IUserForm>({
        email: "",
        password: "",
        name: "",
        surname: "",
        // phone: "",
        city: "",
        country: {
            name: "Россия",
            code: "7",
        },
    })
    // const onSubmit = () => {
    //     Auth.validateInfo(userForm)
    //         .then(filledUser => Auth.reg(filledUser))
    //         .catch(unfilledUserError => setPopUpText(unfilledUserError))
    // }
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countries.find(c => c.name === event.target.value);
        if (selectedCountry) setUserForm({...userForm, country: selectedCountry})
    }
    const handleChange = (field: string, value: string) => {
        setUserForm({ ...userForm, [field]: value });
    };
    useEffect(() => {
        if (popUpText) {
            const timeoutId = setTimeout(() => {
                setPopUpText(null);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [popUpText]);
    return (
        <div className={cl.ModalWrapper}>
            <div className={cl.ModalHeader}>
                <h1>Регистрация</h1>
                <div className={cl.CloseButton} onClick={onClose}/>
            </div>
            <div className={cl.Modal}>
                <div className={cl.ModalInputs}>
                    <input placeholder="Адрес почты" value={userForm.email} onChange={e => handleChange("email", e.target.value)}/>
                    <input placeholder="Пароль" value={userForm.password} onChange={e => handleChange("password", e.target.value)}/>
                    <div>
                        <input placeholder="Ваше имя" value={userForm.name} onChange={e => handleChange("name", e.target.value)}/>
                        <input
                            placeholder="Ваша фамилия"
                            value={userForm.surname}
                            onChange={e => handleChange("surname", e.target.value)}
                        />
                    </div>
                    {/*<select onChange={handleCountryChange} value={userForm.country.name}>*/}
                    {/*    {countries.map(e => (*/}
                    {/*        <option key={e.code} value={e.name}>*/}
                    {/*            {e.name}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    {/*<div className={cl.PhoneInput}>*/}
                    {/*    <h2>+{userForm.country.code}</h2>*/}
                    {/*    <input placeholder="Номер телефона" value={userForm.phone} onChange={e => handleChange("phone", e.target.value)}/>*/}
                    {/*</div>*/}
                    <input placeholder="Город" value={userForm.city} onChange={e => handleChange("city", e.target.value)}/>
                    {/*<button onClick={onSubmit}>Зарегестрироваться</button>*/}
                </div>
                <div className={cl.ModalNav}>
                    <div className={cl.ModalImage}/>
                </div>
            </div>
            {popUpText && createPortal(<PopUp text={popUpText} />, document.body)}
        </div>
    );
};

export default RegModal;