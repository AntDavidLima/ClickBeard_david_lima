import { Link, useNavigate } from 'react-router-dom';
import { SignOut } from '@phosphor-icons/react';

export function Header() {
  const navigate = useNavigate();

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;

  return (
    <header className="p-3 bg-gray-800 flex justify-between items-center">
      <div className="flex items-center gap-6 font-semibold">
        <img src="logo-light.png" width={48} />
        <nav>
          <ul className="flex text-white gap-4">
            {user?.admin && (
              <>
                <li>
                  <Link replace to="/appointments">
                    Agendamentos
                  </Link>
                </li>
                <li>
                  <Link replace to="/barber">
                    Barbeiros
                  </Link>
                </li>
                <li>
                  <Link replace to="/specialties">
                    Especialidades
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="text-white font-semibold flex leading-3 gap-1"
      >
        Sair <SignOut />
      </button>
    </header>
  );

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/signin');
  }
}
