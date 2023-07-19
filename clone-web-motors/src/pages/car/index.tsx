import { useEffect, useState } from 'react'
import { Container } from '../../components/container'
import { FaWhatsapp } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { getDoc, doc, } from 'firebase/firestore'
import { db } from '../../serevices/firebaseConnection'

import { Swiper, SwiperSlide } from 'swiper/react'


interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  model: string;
  price: string | number;
  description: string
  city: string;
  km: string;
  owner: string,
  whatsapp: string,
  created: string
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

function CarDetail() {
  const [car, setCar] = useState<CarProps>()
  const [sliderPreview, setSliderPreview] = useState<number>(2)

  const { id } = useParams()

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return
      }


      const docRef = doc(db, 'cars', id)
      getDoc(docRef)
        .then((snapshot) => {
          setCar({
            id: snapshot.id,
            name: snapshot.data()?.name,
            year: snapshot.data()?.year,
            city: snapshot.data()?.city,
            model: snapshot.data()?.model,
            uid: snapshot.data()?.uid,
            description: snapshot.data()?.description,
            created: snapshot.data()?.created,
            whatsapp: snapshot.data()?.whatsapp,
            price: snapshot.data()?.price,
            km: snapshot.data()?.km,
            owner: snapshot.data()?.owner,
            images: snapshot.data()?.images,
          })
        })
    }
    loadCar()
  }, [id])

// SETANDO 1 IMG PARA MOBILE
  useEffect(() =>{
    function handleResize(){
      if(window.innerWidth < 720){
        setSliderPreview(1)
      } else{
        setSliderPreview(2)
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return() =>{
      window.removeEventListener('resize', handleResize)
    }
  },[])

  return (
    <Container>
      <Swiper
      slidesPerView={sliderPreview}
      pagination={{ clickable: true }}
      navigation
      >
        {car?.images.map(image => (
          <SwiperSlide key={image.name}>
            <img src={image.url}
            className='w-full h-96 object-cover'
             />
          </SwiperSlide>
        ))}
      </Swiper>

      {car && (
        <main className='w-full bg-white rounded-lg p-6 my-4'>
          <div className='flex flex-col sm:flex-row mb-4 items-center justify-between'>
            <h1 className='font-bold text-3xl text-black'>{car?.name}</h1>
            <h1 className='font-bold text-3xl text-black'> R$ {car?.price}</h1>
          </div>
          <p>{car?.model}</p>

          <div className='flex w-full gap-6 my-4'>
            <div className='flex flex-col gap-4'>
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>

              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <div>
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>

        <strong>Descrição:</strong>
        <p className='mb-4 break-words'>{car?.description}</p>

        <strong>Telefone/Whatsapp</strong>
        <p>{car?.whatsapp}</p>

        <a 
        href={`https://wa.me/${car?.whatsapp}` }
        target='_blank'
        className='bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer'
        >
          Conversar com o vendedor
          <FaWhatsapp size={26} color='#fff'/>
        </a>
        </main>
      )}
    </Container>
  )
}

export { CarDetail }

// AULA 94