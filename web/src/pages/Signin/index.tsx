import * as Form from '@radix-ui/react-form';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-light.png';

import { Input } from '../../components/Input';

export function Signin() {
  return (
    <main
      className={
        'bg-[url(background.jpg)] h-screen bg-cover bg-no-repeat flex bg-center items-center justify-center'
      }
    >
      <Form.Root className="bg-gray-950 bg-opacity-90 rounded text-white font-semibold gap-4 flex flex-col w-96 p-12 mx-4">
        <div className="flex flex-col items-center">
          <img src={logo} width={100} alt="Logo" />
          <h1 className="text-3xl font-mono my-4">Login</h1>
        </div>
        <Form.Field name="email">
          <Form.Label className="sr-only">Email</Form.Label>
          <Form.Control asChild placeholder="Email">
            <Input type="email" />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password">
          <Form.Label className="sr-only">Senha</Form.Label>
          <Form.Control asChild placeholder="Senha">
            <Input type="password" />
          </Form.Control>
        </Form.Field>
        <Form.Submit className="bg-amber-600 p-2 rounded-3xl mt-8">
          Acessar
        </Form.Submit>
        <div className="my-4 flex items-center gap-2">
          <hr className="flex-1" />
          ou
          <hr className="flex-1" />
        </div>
        <Link to="/signup" className="text-amber-600 text-center">
          Criar uma conta
        </Link>
      </Form.Root>
    </main>
  );
}
