"use client"
import cl from "./Header.module.scss"
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import AuthModal from "@/app/LayoutComponents/AuthModal/AuthModal";
import RegModal from "@/app/LayoutComponents/RegModal/RegModal";
//@ts-ignore
import Cookies from "js-cookie";
import UserAuthStore from "@/app/Service/UserStore/UserAuthStore";
import {useRouter} from "next/navigation";
import popUp from "@/app/UIComponents/PopUp/PopUp";
import PopUp from "@/app/UIComponents/PopUp/PopUp";

type ModalType = 'auth' | 'reg' | null;
const Header = () => {
    const {replace, push} = useRouter()
    // Получение инф о аутентификации
    const {userIsAuth, setUserIsAuth, setToken} = UserAuthStore();
    // Cостояние фона при открытой модалке
    const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);
    // Тип модального окна
    const [modalType, setModalType] = useState<ModalType>(null)
    // Обработчик открытия
    const openModal = (type: ModalType) => {
        setModalType(type)
        setOverlayVisible(true)
    }
    // Обработчик закрытия
    const closeModal = () => {
        setModalType(null)
        setOverlayVisible(false)
    }
    // Обработчик клика за границы модалки
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) closeModal();
    };
    // Обработчик клика, переводит на страцицу с типом товаров
    const handleItemClick = (typeOfRent: string) => {
        replace(`/search?type_of_rent=${typeOfRent}`);
    };
    // Сброс аутентификации (Выход)
    const handleUserExit = () => {
        Cookies.remove("token")
        setToken(null)
        setUserIsAuth(false)
    }
    // Проверка аутентификации при загрузке
    useEffect(() => {
        const authToken = Cookies.get("token")
        if(authToken){
            setUserIsAuth(true)
        }
    }, [])
    // Обработчик клика, проверяет аудентификацию и переводит на страцицу с созданием товара
    const handleNavigate = () => {
        if(!userIsAuth){
            setModalType("auth")
            setOverlayVisible(true)
            return;
        }
        push("/create")
    }
    return (
        <header className={cl.HeaderWrapper}>
            <div className={cl.Header}>
                <div className={cl.HeaderLeftElements}>
                    <div onClick={() => replace("/")} className={cl.HeaderLogo}/>
                    <nav className={cl.HeaderNav}>
                        <ul>
                            <li onClick={() => handleItemClick('rent')}>Aренда</li>
                            <li onClick={() => handleItemClick('sale')}>Покупка</li>
                            <li onClick={() => handleNavigate()}>Продажа</li>
                        </ul>
                    </nav>
                </div>
                <div className={cl.HeaderButtons}>
                    {userIsAuth ?
                        <button onClick={() => handleUserExit()}>Выйти</button>
                    :
                        <button onClick={() => openModal('auth')}>Войти или зарегистрироваться</button>
                    }
                </div>
            </div>
            {isOverlayVisible && <div className={cl.Overlay} onClick={handleOverlayClick}/>}
            {modalType && (
                <>
                    {modalType === 'auth' && createPortal(<AuthModal onClose={closeModal} />, document.body)}
                    {modalType === 'reg' && createPortal(<RegModal onClose={closeModal} />, document.body)}
                </>
            )}
        </header>
    );
};

export default Header;