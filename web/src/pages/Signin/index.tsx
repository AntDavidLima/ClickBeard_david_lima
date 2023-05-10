import * as Form from '@radix-ui/react-form';
import { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';
import { api } from '../../www/api';
import { User } from '../../@types/User';

export function Signin() {
  const navigate = useNavigate();

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;

  if (user) {
    return <Navigate to={user.admin ? '/appointments' : '/scheduling'} />;
  }

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
          <Form.Message match="valueMissing">Campo obrigatório</Form.Message>
          <Form.Message match="typeMismatch">Email inválido</Form.Message>
        </Form.Field>
        <Form.Field name="password">
          <Form.Label className="sr-only">Senha</Form.Label>
          <Form.Control asChild placeholder="Senha (Mínimo de 6 caracteres)">
            <Input type="password" min={6} />
          </Form.Control>
          <Form.Message match="valueMissing">Campo obrigatório</Form.Message>
          <Form.Message match="rangeUnderflow">
            Mínimo de 6 caracteres
          </Form.Message>
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
      const {
        data: { token },
      } = await api.post<{ token: string }>('/users/session', {
        email: email.value,
        password: password.value,
      });

      const { data: user } = await api.get<User>('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem('user', JSON.stringify({ token, ...user }));

      navigate(user.admin ? '/appointments' : '/scheduling');
    } catch (error) {
      console.log(error);
    }
  }
}
