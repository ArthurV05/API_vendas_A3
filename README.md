Canto do Silêncio 😴😴- Aplicação de vendas

Projeto desenvolvido para a disciplina de Sistemas Distribuídos e Mobile.

A ideia é simular o sistema de vendas de uma loja fictícia chamada **Canto do Silêncio**, especializada em produtos para introvertidos. O sistema é uma API REST feita em Node.js com banco PostgreSQL, e tudo roda em containers Docker.

---

O que o sistema faz

- Cadastro e gerenciamento de clientes, vendedores e produtos
- Criação e cancelamento de pedidos de venda (com controle automático de estoque)
- Geração de relatórios estatísticos em um serviço separado

---

Tecnologias usadas

- Node.js com Express
- PostgreSQL
- Docker e Docker Compose
- git

---

Pré-requisitos

Você vai precisar ter instalado na sua máquina:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Não precisa instalar Node.js nem PostgreSQL manualmente — o Docker cuidará desses detalhes.

---

Como rodar o projeto

**1. Clone o repositório**

``` bash
git clone https://github.com/ArthurV05/API_vendas_A3.git
cd API_vendas_A3
```

**2. Crie o arquivo `.env`**

Copie o arquivo de exemplo e preencha com as suas configurações:

``` bash
cp .env.example .env
```

Edite o `.env` com os dados do seu banco:

```env
DB_HOST=db
DB_PORT=5432
DB_NAME=canto_silencio
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

APP_PORT=3000
RELATORIO_PORT=3001
```

**Observação: o `DB_HOST` deve ser `db` (e não `localhost`) porque dentro do Docker os serviços se comunicam pelo nome do container, não pelo endereço local da máquina.**

**3. Suba os containers**

```bash
docker-compose up --build
```

Isso vai iniciar três containers:

- Banco de dados PostgreSQL (porta 5432)
- API principal (porta 3000)
- Serviço de relatórios (porta 3001)

Na primeira vez, o banco já é criado automaticamente com as tabelas e os dados iniciais (10 produtos, 5 clientes e 2 vendedores).

**4. Testar funcionamento**

```bash
# Listar clientes
curl http://localhost:3000/clientes

# Gerar relatório de produtos mais vendidos
curl http://localhost:3001/relatorios/produtos-mais-vendidos
```

**Para parar os containers:**

```bash
docker-compose down
```

Se quiser apagar os dados do banco também:

```bash
docker-compose down -v
```

---

Rotas disponíveis

API principal — porta 3000

**Clientes**
```
GET    /clientes          lista todos os clientes
GET    /clientes/:id      busca um cliente pelo ID
POST   /clientes          cadastra um novo cliente
PUT    /clientes/:id      atualiza um cliente
DELETE /clientes/:id      remove um cliente
```

**Produtos**
```
GET    /produtos               lista todos os produtos
GET    /produtos/:id           busca um produto pelo ID
POST   /produtos               cadastra um novo produto
PUT    /produtos/:id           atualiza um produto
PUT    /produtos/:id/estoque   atualiza só a quantidade em estoque
DELETE /produtos/:id           remove um produto
```

**Vendedores**
```
GET    /vendedores          lista todos os vendedores
GET    /vendedores/:id      busca um vendedor pelo ID
POST   /vendedores          cadastra um novo vendedor
PUT    /vendedores/:id      atualiza um vendedor
DELETE /vendedores/:id      remove um vendedor
```

**Vendas**
```
GET  /vendas               lista todas as vendas
GET  /vendas/:id           busca uma venda com os itens pelo ID
POST /vendas               cria um novo pedido
PUT  /vendas/:id/cancelar  cancela um pedido
```

Serviço de relatórios — porta 3001

```
GET /relatorios/produtos-mais-vendidos   produtos por quantidade vendida e receita gerada
GET /relatorios/vendas-por-cliente       total de pedidos e valor gasto por cliente
GET /relatorios/consumo-medio            valor médio de compra por cliente
GET /relatorios/baixo-estoque            produtos com estoque baixo (5 unidades por padrão)
```

No relatório de baixo estoque, você pode passar um limite personalizado:
```
GET /relatorios/baixo-estoque?limite=10
```

---

Exemplos de uso

**Criar um pedido:**
```json
POST /vendas

{
  "clienteId": 1,
  "vendedorId": 1,
  "itens": [
    { "produtoId": 1, "quantidade": 2 },
    { "produtoId": 3, "quantidade": 1 }
  ]
}
```

O sistema valida automaticamente se o cliente e o vendedor existem, se há estoque suficiente para cada produto, calcula o valor total e baixa o estoque ao confirmar o pedido.

**Cancelar um pedido:**
```
PUT /vendas/1/cancelar
```

Ao cancelar, o estoque de todos os itens é devolvido automaticamente.

**Cadastrar um cliente:**
```json
POST /clientes

{
  "nome": "Maria Quieta",
  "email": "maria@email.com",
  "telefone": "(11) 99999-9999"
}
```

---

Arquitetura

O projeto possui uma arquitetura em camadas:

```
Requisição HTTP
      
  Controller   ->  recebe a requisição e devolve a resposta
    
   Service     ->  regras de negócio e validações
    
    DAO         -> consultas SQL no banco de dados
    
  PostgreSQL    -> Banco de dados consultado
```

