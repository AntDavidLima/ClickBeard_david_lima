import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-full bg-contain bg-center bg-no-repeat flex flex-col justify-center bg-gray-900">
      <h1 className="text-white text-9xl text-center mt-10">404</h1>
      <h2 className="text-white text-xl text-center mt-10">
        Página não encontrada
      </h2>
      <button className="mt-2 text-amber-500" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </main>
  );
}
