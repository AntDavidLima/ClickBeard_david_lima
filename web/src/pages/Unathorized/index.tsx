export function Unauthorized() {
  return (
    <main className="bg-[url(not-allowed-background.jpg)] h-screen w-full bg-contain bg-center bg-no-repeat bg-gray-900">
      <h1 className="text-white text-6xl text-center mt-10">
        Você não tem permissão para acessar essa página
      </h1>
    </main>
  );
}
