import { Outlet } from "react-router-dom";

const Autenticar = () => {
  return (
    <>
      <h1>Layout principal</h1>
      <main className="container flex flex-row flex-wrap justify-center mt-6 mx-auto w-full">
        <Outlet />
      </main>
    </>
  )
};

export default Autenticar;


