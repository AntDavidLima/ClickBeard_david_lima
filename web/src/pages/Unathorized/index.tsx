import { useNavigate } from 'react-router-dom';

export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <main className="bg-[url(not-allowed-background.jpg)] h-screen w-full bg-contain bg-center bg-no-repeat bg-gray-900">
      <h1 className="text-white text-6xl text-center mt-10">
        Você não tem permissão para acessar essa página
      </h1>
      <button className="mt-2 text-amber-500" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </main>
  );
}
