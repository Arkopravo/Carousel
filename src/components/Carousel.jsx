import React, { useEffect, useRef, useState } from 'react'

const Carousel = ({
    images = [], 
    isLoading = false, 
    imageLimit = images.length, 
    onImgClick = () => {},
    customPrevButton, 
    customNextButton, 
    imagePerSlide=1,
}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const [imgWidth, setImgWidth] = useState(0);

    const imageRef = useRef(null);


    useEffect(() => {
        setCurrentIndex(0);
    },[images])


    const goToPrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? imageLimit - 1 : prevIndex - 1);
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === imageLimit - 1 ? 0 : prevIndex + 1);
    }

    // console.log(currentIndex);

    // console.log(imageRef?.current?.offsetWidth);

  return isLoading ? (<div>Loading...</div>) : 
    (
        <div className='carousel' style={{width: imagePerSlide * imgWidth}}>
            <div className="image-container"
                style={{transform: `translateX(-${currentIndex * imgWidth}px)`}}>
                {images.slice(0, imageLimit > images.length ? images.length : imageLimit)
                    .map((image, index) => {
                        return <img 
                                    onLoad={() => setImgWidth(imageRef?.current?.offsetWidth)}
                                    ref={imageRef}
                                    key={image.id}
                                    src={image.url}
                                    onClick={() => onImgClick(image, index)}
                                    alt={image.title}
                                    className='image'/>
                    })
                }
            </div>

            {
                customPrevButton instanceof Function ? 
                (
                    customPrevButton(goToPrev)
                ) : 
                (
                    <button className="btn prev" onClick={goToPrev}>
                        Prev
                    </button>
                )
            }
            {
                customNextButton instanceof Function ? 
                (
                    customNextButton(goToNext)
                ) : 
                (
                    <button className="btn next" onClick={goToNext}>
                        Next
                    </button>
                )
            }
        </div>
    )
  
}

export default Carousel;

