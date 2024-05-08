import { useEffect, useState } from 'react'
import './App.css'
import Carousel from './components/Carousel'

function App() {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  console.log(images);

  // https://jsonplaceholder.typicode.com/photos?_limit=8

  const fetchImages = async (imageLimit) => {
    setLoading(true);
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${imageLimit}`);
      const data = await response.json();
      // console.log(data);
      setImages(data);
    }
    catch(error) {
      console.log(error);
    }
    setLoading(false);
  }


  useEffect(() => {
    fetchImages(8);
  }, [])

  return (
    <div className='carousel-container'>
      <Carousel images = {images} 
                isLoading = {loading} 
                // onImageClick={(image, index) => {}}
                imageLimit = {4}
                customPrevButton={(onClick) => (
                  <button
                    className="btn prev"
                    style={{background: "red"}}
                    onClick={onClick}
                  >
                    Prev
                  </button>
                )}
                customNextButton={(onClick) => (
                  <button
                    className="btn next"
                    style={{background: "blue"}}
                    onClick={onClick}
                  >
                    Next
                  </button>
                )}
                imagePerSlide = {2}
                />
    </div>
  )
}

export default App
