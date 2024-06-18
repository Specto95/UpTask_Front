import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="font-black text-center text-4xl text-white">
        Pagina no Encontrada
      </h1>
      <Link to="/" className="text-fuchsia-500">
        Volver al Inicio
      </Link>
    </div>
  );
}
