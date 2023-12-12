import React, {useEffect, useState} from 'react';
import cl from "./photosCarousel.module.scss"
import Image from "next/image";

const PhotosCarousel = ({photos, width, height}: {photos: string[], width: number, height: number}) => {
    const [activeImage, setActiveImage] = useState(0)
    const [currentLine, setCurrentLine] = useState(1)
    const photosPerPage = 6;
    useEffect(() => {
        setCurrentLine(~~(activeImage / photosPerPage))
    }, [activeImage]);
    return (
        <div className={cl.carouselWrapper} style={{width: width, height: height}}>
            <div className={cl.mainImage} style={{backgroundImage:`url(${photos[activeImage]})`}}>
                <button className={cl.L} onClick={() => setActiveImage((activeImage - 1 + photos.length) % photos.length)}>
                    <Image src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Left" width={20} height={20}/>
                </button>
                <button className={cl.R} onClick={() => setActiveImage((activeImage + 1) % photos.length)}>
                    <Image src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="Right" width={20} height={20}/>
                </button>
                <div className={cl.text}>{activeImage + 1}/{photos.length}</div>
            </div>
            <div className={cl.rowImages}>
                {[1, 2, 3, 4, 5, 6].map((index) =>
                    <div
                        key={index}
                        onClick={() => setActiveImage((currentLine * photosPerPage + index - 1))}
                        style={{backgroundImage: `url(${photos[(currentLine * photosPerPage + index - 1) % photos.length]})`}}
                        className={`${cl.rowImage} ${(currentLine * photosPerPage + index - 1) === activeImage && `${cl.activeImage}`}`}
                    />
                )}
            </div>
        </div>
    );
};
export default PhotosCarousel;