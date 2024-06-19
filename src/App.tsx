import Webcam from "react-webcam";

function App() {
  return (
    <>
      <section className="flex items-center justify-center h-screen bg-[#03285D]">
        <div className="py-[2rem] px-[5rem] bg-slate-50 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl text-blue-600/80">Take Selfie</h1>

          <Webcam />

          <button className="bg-amber-500 px-10 py-2 text-lg font-semibold text-white uppercase leading-2">Continute</button>
        </div>
      </section>
    </>
  );
}

export default App;
