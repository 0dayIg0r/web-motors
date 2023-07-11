import { Container } from "../../components/container";

function Home() {
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
        <section className="w-full bg-white rounded-lg">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2023/202307/20230711/toyota-corolla-2.0-vvtie-flex-grs-direct-shift-wmimagem19065586439.jpg?s=fill&w=552&h=414&q=60"
            alt="Carro"
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
          />
          <p className="font-bold mt-1 mb-2 px-2">COROLÃO</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">ano 2023/2023 | 350km </span>
            <strong className="text-black font-medium text-xl"> R$ 290.000</strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2 ">
            <span className="text-zinc-700">Brasília - DF</span>
          </div>

        </section>
         <section className="w-full bg-white rounded-lg">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2023/202307/20230711/toyota-corolla-2.0-vvtie-flex-grs-direct-shift-wmimagem19065586439.jpg?s=fill&w=552&h=414&q=60"
            alt="Carro"
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
          />
          <p className="font-bold mt-1 mb-2 px-2">COROLÃO</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">ano 2023/2023 | 350km </span>
            <strong className="text-black font-medium text-xl"> R$ 290.000</strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2 ">
            <span className="text-zinc-700">Brasília - DF</span>
          </div>

        </section>
      </main>
    </Container>
  );
}

export { Home };
