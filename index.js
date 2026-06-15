require('dotenv').config();

const express = require('express');
const pool = require('./database/db');

// DAOs
const ClienteDAO = require('./daos/ClienteDAO');
const ProdutoDAO = require('./daos/ProdutoDAO');
const VendedorDAO = require('./daos/VendedorDAO');
const VendaDAO = require('./daos/VendaDAO');
const Item_VendaDAO = require('./daos/Item_VendaDAO');

// Services
const ClienteService = require('./services/ClienteService');
const ProdutoService = require('./services/ProdutoService');
const VendedorService = require('./services/VendedorService');
const VendaService = require('./services/VendaService');

// Controllers
const ClienteController = require('./controllers/ClienteController');
const ProdutoController = require('./controllers/ProdutoController');
const VendedorController = require('./controllers/VendedorController');
const VendaController = require('./controllers/VendaController');

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

// Instâncias dos DAOs
const clienteDAO = new ClienteDAO(pool);
const produtoDAO = new ProdutoDAO(pool);
const vendedorDAO = new VendedorDAO(pool);
const vendaDAO = new VendaDAO(pool);
const itemVendaDAO = new Item_VendaDAO(pool);

// Instâncias dos Services
const clienteService = new ClienteService(clienteDAO);
const produtoService = new ProdutoService(produtoDAO);
const vendedorService = new VendedorService(vendedorDAO);
const vendaService = new VendaService(vendaDAO, itemVendaDAO, produtoDAO, clienteDAO, vendedorDAO);

// Instâncias dos Controllers
const clienteController = new ClienteController(clienteService);
const produtoController = new ProdutoController(produtoService);
const vendedorController = new VendedorController(vendedorService);
const vendaController = new VendaController(vendaService);

//ROTAS

app.get('/', (req, res) => {
  res.send('Bem-vindo ao Canto do Silêncio!!');
});
// Clientes
app.get('/clientes', (req, res) => clienteController.listarTodos(req, res));
app.get('/clientes/:id', (req, res) => clienteController.buscarPorId(req, res));
app.post('/clientes', (req, res) => clienteController.criar(req, res));
app.put('/clientes/:id', (req, res) => clienteController.atualizar(req, res));
app.delete('/clientes/:id', (req, res) => clienteController.deletar(req, res));

// Produtos
app.get('/produtos', (req, res) => produtoController.listarTodos(req, res));
app.get('/produtos/:id', (req, res) => produtoController.buscarPorId(req, res));
app.post('/produtos', (req, res) => produtoController.criar(req, res));
app.put('/produtos/:id', (req, res) => produtoController.atualizar(req, res));
app.put('/produtos/:id/estoque', (req, res) => produtoController.atualizarEstoque(req, res));
app.delete('/produtos/:id', (req, res) => produtoController.deletar(req, res));

// Vendedores
app.get('/vendedores', (req, res) => vendedorController.listarTodos(req, res));
app.get('/vendedores/:id', (req, res) => vendedorController.buscarPorId(req, res));
app.post('/vendedores', (req, res) => vendedorController.criar(req, res));
app.put('/vendedores/:id', (req, res) => vendedorController.atualizar(req, res));
app.delete('/vendedores/:id', (req, res) => vendedorController.deletar(req, res));

// Vendas
app.get('/vendas', (req, res) => vendaController.listarTodas(req, res));
app.get('/vendas/:id', (req, res) => vendaController.buscarPorId(req, res));
app.post('/vendas', (req, res) => vendaController.criarPedido(req, res));
app.put('/vendas/:id/cancelar', (req, res) => vendaController.cancelarPedido(req, res));

app.listen(APP_PORT, () => {
    console.log(`🚀 Canto do Silêncio API rodando na porta ${APP_PORT}`);
});

module.exports = app;
