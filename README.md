
  # IoT Elevator Control Dashboard

  This is a code bundle for IoT Elevator Control Dashboard. The original project is available at https://www.figma.com/design/WrX804sG9S2Vc5JlW64Ult/IoT-Elevator-Control-Dashboard.

  ## Running the code

  Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server (porta padrão Vite 5173).

## IoT mock server

O back-end de protótipo está em `../server`.

1. Instale as dependências: `npm install`
2. Inicie o servidor: `npm start`

O endpoint `POST http://localhost:3000/sensores` recebe:

```json
{
  "presenca": 0,
  "obstrucao": 1
}
```

### Configurar porta/URL personalizada

Se o servidor IoT estiver rodando em outra porta/URL, crie um arquivo `.env` na raiz de `client` com:

```
VITE_API_URL=http://localhost:4000
```

E ajuste a porta do servidor usando a variável de ambiente `PORT` antes de iniciar:

```
PORT=4000 npm start
```

E devolve:

```json
{
  "porta": 1,
  "mensagem": "Leitura processada com sucesso"
}
```
  