import * as Form from '@radix-ui/react-form';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';
import { api } from '../../api';

export function Signin() {
  const navigate = useNavigate();

  return (
    <main
      className={
        'bg-[url(background.jpg)] h-screen bg-cover bg-no-repeat flex bg-center items-center justify-center'
      }
    >
      <Form.Root
        onSubmit={handleSubmit}
        className="bg-gray-950 bg-opacity-90 rounded text-white font-semibold gap-4 flex flex-col w-96 p-12 mx-4"
      >
        <div className="flex flex-col items-center">
          <img src="logo-light.png" width={100} alt="Logo" />
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { password, email } = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      email: { value: string };
      password: { value: string };
    };

    try {
      const { data } = await api.post<{ token: string }>('/users/session', {
        email: email.value,
        password: password.value,
      });

      localStorage.setItem('token', data.token);

      navigate('/scheduling');
    } catch (error) {
      console.log(error);
    }
  }
}
