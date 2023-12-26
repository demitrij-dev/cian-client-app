import React, {useEffect, useState} from 'react';
import cl from "./addPhotoCarousel.module.scss"
import Image from "next/image";
const AddPhotoCarousel = (
    {photos, width, height, handleAddPhoto}: {photos: string[], width: number, height: number, handleAddPhoto: () => void}
) => {
    const [activeImage, setActiveImage] = useState(0)
    const [currentLine, setCurrentLine] = useState(1)
    const photosPerPage = 6;
    useEffect(() => {
        setCurrentLine(~~(activeImage / photosPerPage))
    }, [activeImage]);
    return (
        <div className={cl.carouselWrapper} style={{width: width, height: height}}>
            <div className={cl.mainImage} style={{backgroundImage:`url(${photos[activeImage]})`}}>
                {photos.length > 0 &&
                    <>
                        <button className={cl.L} onClick={() => setActiveImage((activeImage - 1 + photos.length) % photos.length)}>
                            <Image src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Left" width={20} height={20}/>
                        </button>
                        <button className={cl.R} onClick={() => setActiveImage((activeImage + 1) % photos.length)}>
                            <Image src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="Right" width={20} height={20}/>
                        </button>
                        <div className={cl.text}>{activeImage + 1}/{photos.length || 1}</div>
                    </>
                }
            </div>
            <div className={cl.rowImages}>
                {[...photos.slice(0, 5)].map((_, index) =>
                    <div
                        key={index}
                        onClick={() => setActiveImage((currentLine * photosPerPage + index) % photos.length)}
                        style={{backgroundImage: `url(${photos[(currentLine * photosPerPage + index) % photos.length]})`}}
                        className={`${cl.rowImage} ${(currentLine * photosPerPage + index) === activeImage && `${cl.activeImage}`}`}
                    />
                )}
                <div className={cl.loadPhoto} onClick={handleAddPhoto}/>
            </div>
        </div>
    );
};

export default AddPhotoCarousel;