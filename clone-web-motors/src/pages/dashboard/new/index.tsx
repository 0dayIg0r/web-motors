/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { ChangeEvent, useState, useContext } from "react";
import { Container } from "../../../components/container";
import DashboardHeader from "../../../components/painelheader";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/AuthContext";
import { storage, db } from "../../../serevices/firebaseConnection";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";

const schema = z.object({
  name: z.string().nonempty("Digite seu nome"),
  model: z.string().nonempty("Digite o modelo do carro"),
  year: z.string().nonempty("Digite o ano do carro"),
  km: z.string().nonempty("Digite a quilometragem"),
  price: z.string().nonempty("Digite o valor do carro"),
  city: z.string().nonempty("Digite o nome da cidade"),
  whatsapp: z
    .string()
    .min(1, "Digite seu telefone/whatsapp")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Número inválido",
    }),
  description: z.string().nonempty("Faça uma descrição sobre o carro"),
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string,
  name: string,
  previewUrl: string,
  url: string
}
function New() {
  const { user } = useContext(AuthContext); 

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [carImages, setCarImages] = useState<ImageItemProps[]>([])

  function onSubmit(data: FormData ) {

    if(carImages.length === 0){
      alert('Envie no mínimo uma imagem')
      return
    }

     const carListImages = carImages.map(car =>{
      return {
        uid: car.uid,
        name: car.name,
        url: car.url
      }
     })

     addDoc(collection(db, 'cars'), {
      name: data.name.toUpperCase(),
      model: data.model,
      year: data.year,
      whatsapp: data.whatsapp,
      city: data.city,
      km: data.km,
      price: data.price,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carImages
     })
     .then(() =>{
      reset()
      setCarImages([])
      console.log('Cadastrou')
     })
     .catch((e: any)=>{
      console.log(e.message)
     })

  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image);

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        alert("O arquivo tem que ser em JPEG ou PNG");
        return;
      }
    }
  }

  function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshop) => {
      getDownloadURL(snapshop.ref).then((downloadUrl) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        }
        setCarImages((images) => [...images, imageItem])
      });
    });
  }

  async function handleDeleteImage(item: ImageItemProps){
    const imagePath = `images/${item.uid}/${item.name}`
  
    const imageRef = ref(storage, imagePath)
    try {
      await deleteObject(imageRef)
      setCarImages(carImages.filter((car) => car.url !== item.url))
      
    } catch (e:any) {
      console.log(e.message)
    }

  }
  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center- gap-2 ">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.map((item) =>(
          <div key={item.name} className="w-full h-32 flex justify-center relative items-center">
            <button className="absolute" onClick={() => handleDeleteImage(item)}>
              <FiTrash size={30} color='#fff'/>
            </button>
            <img 
            className="rounded-lg w-full h-32 object-cover"
            src={item.previewUrl}
             alt='imagem do carro'
              /> 
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Onix 1.0..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0 Flex Manual"
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2014/2015"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">KM rodado</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 25.150"
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone/Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 6199335..."
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Brasília - DF"
              />
            </div>
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="Ex: 45.000"
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border-2 w-full rounded-md h-2/4 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição completa do carro"
            />
            {errors.description && (
              <p className="mb-1 text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className=" w-full rounded-md bg-zinc-900 text-white font-medium h-10"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}

export { New };

// aula 84
