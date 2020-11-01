## Pré-requisitos

- [Node.js](https://nodejs.org/en/)

## Instalação e execução

**Faça um clone desse repositório**

Na pasta root do projeto:

- Opção 1:

  - Execute o comando `npm install -g .` para instalar a cli de forma global;
  - Exexute o comando `travel {arquivo}`, por exemplo `travel input-routes.csv` para rodar a aplicação

- Opção 2:

  - Exexute o comando `node . {arquivo}`, por exemplo `node . input-routes.csv` para rodar a aplicação

> A API irá iniciar por padrão na porta 8000, após a execução de qualquer uma das opções acima.

> Você pode alterar a porta adicionando a variável `PORT` ao comando.
> Exemplo: _`PORT=8001 node . {arquivo}`_ ou _`PORT=8001 travel {arquivo}`_

### Executando os testes

- Execute o comando `npm install` ou `yarn install` para instalar as dependências necessárias para executar os testes
- Execute o comando `npm run test` ou `yarn test` para rodar os testes

## Estrutura do projeto

A estrutura foi projetada para deixar o mais simples e intuitivo possível, idealizando a fácil adição e manutenção de código.

**Controllers**

A camada de controllers é responsável por manipular solicitações recebidas e retornar uma resposta ao cliente.

**Services**

A camada responsável por abstrair as regras de negócio, permitindo que o controller tenha responsabilidade única.

**Shared**

Trechos de código pequeno que são utilizado por mais de uma classe. Funções que são utilizadas para auxiliar na construção de um código maior e podendo ser utilizado em qualquer parte das camadas da aplicação.

## Decisões adotadas na solução

- Foi decidido desenvolver a solução com Node.js buscando tornar o desenvolvimento mais rápido e produtivo.
- Como recomendado, não foi utilizado nenhum framework ou biblioteca externas para o desenvolvimento da solução.
- Não foi utilizado TypeScript, seguindo a recomendação de não utilizar nada externo.
- Foi mantido um código simples e o mais limpo possível.

## API

<table>
<thead>
<tr>
<th>Path</th>
<th>Method</th>
<th>Descrição</th>
<th>Body</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>/routes</code></td>
<td><code>POST</code></td>
<td>Registra uma nova rota</td>
<td>Exemplo: <code>{ "source": "BRC", "destination": "ORL", "cost": 10 }</code></td>
</tr>
<tr>
<td><code>/routes?source={origem}&destination={destino}</code></td>
<td><code>GET</code></td>
<td>Busca pelo melhar rota (a mais barata e menor entre elas)</td>
<td><code>none</code></td>
</tr>
</tbody>
</table>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ea8f9e40271110a3ccfb)

---

Feito com ♡ by Brendenson [Github](https://github.com/trylix) | [GitLab](https://gitlab.com/brendenson) | [LinkedIn](https://www.linkedin.com/in/dobrendenson)
