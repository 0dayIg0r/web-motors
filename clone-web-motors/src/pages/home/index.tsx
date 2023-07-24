import { useState, useEffect } from "react";
import { Container } from "../../components/container";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../serevices/firebaseConnection";
import { Link } from "react-router-dom";

import img from '../../assets/404.png'

interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price:  number;
  city: string;
  km: number;
  images: CarImageProps[];

}
interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}


function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loadImg, setLoadImg] = useState<string[]>([])
  const [input, setInput] = useState('')


  useEffect(() => {

    loadCars();
  }, []);

  function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

    getDocs(queryRef).then((snapshop) => {
      let listcars = [] as CarProps[];

      snapshop.forEach((doc) => {
        listcars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          km: doc.data().km,
          city: doc.data().city,
          price: doc.data().price,
          images: doc.data().images,
          uid: doc.data().uid,

        });
      })
      setCars(listcars)



    });
  }


  // REMOVENDO LAYOUT SHIFT
  function handleImgLoad(id: string) {
    setLoadImg((prevImageLoaded) => [...prevImageLoaded, id])
  }

  // FUNÇÃO PESQUISA
  async function handleSearchCar() {
    if (input === '') {
      loadCars()
      return
    }
    setCars([])
    setLoadImg([])

    const q = query(collection(db, 'cars'),
      where('name', '>=', input.toUpperCase()),
      // INSERIR TODOS OS CARACTERES NA CONSULTA
      where('name', '<=', input.toUpperCase() + '\uff8ff')
    )

    const qSnapshot = await getDocs(q)
    const listcars = [] as CarProps[]

    qSnapshot.forEach((doc) => {
      listcars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid,
      });
    })
    setCars(listcars)

    if(listcars.length === 0 ){
      return (
        <div>
          <img src={img} alt="" />
        </div>
      )
    }

  }
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          type="Pesquise por um carro"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
          onClick={handleSearchCar}
        >

          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      
       {/* grid */}
       <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* referente a cada item do carro */}
            {cars.map((car) => (
              
              <Link to={`/car/${car.id}`} key={car.id}>
                <section className="w-full bg-white rounded-lg" >
                  <div
                    className="w-full h-72 rounded-lg bg-slate-200"
                    style={{ display: loadImg.includes(car.id) ? 'none' : 'block' }}
                  > </div>
                  <img
                    src={car.images[0].url}
                    alt="Carro"
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    onLoad={() => handleImgLoad(car.id)}
                    // RENDERIZAR IMG APENAS CARREGADA
                    style={{ display: loadImg.includes(car.id) ? 'block' : 'none' }}
                  />
                  <p className="font-bold mt-1 mb-2 px-2 break-words ">{car.name}</p>

                  <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">
                      {car.year} | {Number(car.km).toLocaleString('pt-BR')} km{" "}
                    </span>
                    <strong className="text-black font-medium text-xl">
                      {" "}
                      {Number(car.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </strong>
                  </div>

                  <div className="w-full h-px bg-slate-200 my-2"></div>

                  <div className="px-2 pb-2 ">
                    <span className="text-zinc-700">{car.city}</span>
                  </div>
                </section>
              </Link>
            ))}
          </main>
    </Container>
  );
}

export { Home };
