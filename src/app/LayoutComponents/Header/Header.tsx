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

type ModalType = 'auth' | 'reg' | null;
const Header = () => {
    const {replace, push} = useRouter()
    const {userIsAuth, setUserIsAuth, setToken} = UserAuthStore();
    const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>(null)
    const openModal = (type: ModalType) => {
        setModalType(type)
        setOverlayVisible(true)
    }
    const closeModal = () => {
        setModalType(null)
        setOverlayVisible(false)
    }
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) closeModal();
    };
    const handleItemClick = (typeOfRent: string) => {
        replace(`/search?type_of_rent=${typeOfRent}`);
    };
    const handleUserExit = () => {
        Cookies.remove("token")
        setToken(null)
        setUserIsAuth(false)
    }
    useEffect(() => {
        const authToken = Cookies.get("token")
        if(authToken){
            setUserIsAuth(true)
        }
    }, [])
    return (
        <header className={cl.HeaderWrapper}>
            <div className={cl.Header}>
                <div className={cl.HeaderLeftElements}>
                    <div onClick={() => replace("/")} className={cl.HeaderLogo}/>
                    <nav className={cl.HeaderNav}>
                        <ul>
                            <li onClick={() => handleItemClick('rent')}>Aренда</li>
                            <li onClick={() => handleItemClick('sale')}>Покупка</li>
                            <li>Продажа</li>
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