"use client"
import cl from "./RegModal.module.scss"
import React, {useState} from "react";
interface IClose{
    onClose: () => void
}
interface IUserForm{
    name: string
    country: ICountry
}
interface ICountry{
    name: string
    code: string
}
const RegModal = ({onClose}: IClose) => {
    const [userForm, setUserForm] = useState<IUserForm>({
        name: "",
        country: {
            name: "Russia",
            code: "7"
        },
    })
    const countries: ICountry[] = [{name: "Russia", code: "7"}, {name: "USA", code: "1"}]
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countries.find(c => c.name === event.target.value);
        if (selectedCountry) setUserForm({...userForm, country: selectedCountry})
    }
    // const onSubmit = async () => {
    //     await Auth.reg(email, password)
    // }
    return (
        <div className={cl.ModalWrapper}>
            <div className={cl.ModalHeader}>
                <h1>Регистрация</h1>
                <div className={cl.CloseButton} onClick={onClose}/>
            </div>
            <div className={cl.Modal}>
                <div className={cl.ModalInputs}>
                    <input/>
                    <input/>
                    <div>
                        <input/>
                        <input/>
                    </div>
                    <select onChange={handleCountryChange} value={userForm.country.name}>
                        {countries.map(e => (
                            <option key={e.code} value={e.name}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                    <div style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center",width: "12.5em"}}>
                        <h2>+{userForm.country.code}</h2>
                        <input style={{width: "12em"}}/>
                    </div>
                </div>
                <div className={cl.ModalNav}>
                    <div className={cl.ModalImage}/>
                    <button>Зарегестрироваться</button>
                </div>
            </div>
        </div>
    );
};

export default RegModal;