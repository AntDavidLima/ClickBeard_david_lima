import * as Form from '@radix-ui/react-form';

import styles from './style.module.css';

export function Login() {
  return (
    <main className={styles.main}>
      <Form.Root className="bg-gray-950 p-7 bg-opacity-90 rounded text-white font-semibold gap-4 flex flex-col w-">
        <Form.Field name="email" className={styles.input}>
          <Form.Label className="sr-only">Email</Form.Label>
          <Form.Control asChild placeholder="Email">
            <input type="email" />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password" className={styles.input}>
          <Form.Label className="sr-only">Senha</Form.Label>
          <Form.Control asChild placeholder="Senha">
            <input type="password" />
          </Form.Control>
        </Form.Field>
        <Form.Submit className="bg-amber-600 p-2 rounded-3xl mt-8">
          <button>Acessar</button>
        </Form.Submit>
        <div className="my-4 flex items-center gap-2">
          <hr className="flex-1" />
          ou
          <hr className="flex-1" />
        </div>
        <a href="#" className="text-amber-600 text-center">
          Criar uma conta
        </a>
      </Form.Root>
    </main>
  );
}
