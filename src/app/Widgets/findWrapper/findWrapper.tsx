import React from 'react';
import cl from "./findWrapper.module.scss";
import FindOptions from "@/app/Widgets/findWrapper/Features/findOptions/findOptions";
// Компонент с виджетом фильтров
const FindWrapper = () => {
    return (
        <section className={cl.findWrapper}>
            <div className={cl.findBox}>
                <FindOptions/>
            </div>
        </section>
    );
};

export default FindWrapper;