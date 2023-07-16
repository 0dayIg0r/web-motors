
import { useState, useEffect } from "react";
import { Container } from "../../components/container";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../serevices/firebaseConnection";

interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}
interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}
function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));

      getDocs(queryRef)
      .then((snapshop) =>{
        let listcars = [] as CarProps[]
          snapshop.forEach(doc =>{
            listcars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid,
            })
          })
          setCars(listcars)
      })
    }
    loadCars();
  }, []);
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          type="Pesquise por um carro"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
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
          <section className="w-full bg-white rounded-lg" key={car.id}>
            <img
              src={car.images[0].url}
              alt="Carro"
              className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            />
            <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-700 mb-6">{car.year}| {car.km} km </span>
              <strong className="text-black font-medium text-xl">
                {" "}
                {car.price}
              </strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-2"></div>

            <div className="px-2 pb-2 ">
              <span className="text-zinc-700">{car.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}

export { Home };
