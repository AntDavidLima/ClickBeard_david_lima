# ClickBeard
Sistema de agendamento para barbearia

## Base de dados
PostgreSQL

![Modelo entidade relacionamento](diagrama-entidade-relacionamento.png)

## Requisitos

### Funcionais
- [x] Deve ser possível cadastrar barbeiros
- [x] Deve ser possível cadastrar especialidades
- [x] Os clientes devem poder se cadastrar
- [x] Os clientes devem poder logar no sistema
- [x] Os clientes devem poder agendar horários
- [x] Os clientes devem poder cancelar agendamentos
- [ ] Os clientes devem poder visualizar seus agendamentos
- [ ] O ADM deve poder visualizar os agendamentos futuros

### Regras de negócio
- [x] Usuários não podem se cadastrar com emails que já estão em uso
- [x] Usuários só podem realizar agendamentos após se autenticarem
- [x] Usuários precisam especificar um barbeiro para agendar horários
- [x] Um barbeiro não pode atender dois clientes no mesmo horário
- [x] Um barbeiro pode ter mais de uma especialidade
- [x] Um agendamento só pode ser cancelado até duas horas antes do horário marcado
- [ ] Barbeiros só podem ser cadastrados por ADMs
- [x] No momento de agendar horário, os barbeiros devem ser listados por especialidade
- [x] Não podem existir mais de uma especialidade com o mesmo nome

### Não funcionais
- [x] As senhas dos usuários devem ser criptografadas
- [x] A autenticação de clientes deve se dar a partir de um JWT
- [x] Os dados da aplicação deverão ser persistidos em um banco ProtgreSQL
- [x] A barbearia funciona todos os dias de 8:00h às 18:00h
- [x] Um atendimento demora exatamente 30 minutos
- [ ] A API deve ser documentada utilizando o Swagger
- [ ] O processo para executar a aplicação localmente deve ser docuemntado
