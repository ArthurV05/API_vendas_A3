require('dotenv').config();

const express = require('express');
const pool = require('./db');
const RelatorioDAO = require('./daos/RelatorioDAO');
const RelatorioController = require('./RelatorioController');

const app = express();
const RELATORIO_PORT = process.env.RELATORIO_PORT || 3001;

app.use(express.json());

// Instâncias
const relatorioDAO = new RelatorioDAO(pool);
const relatorioController = new RelatorioController(relatorioDAO);

// ROTAS

// Produtos mais vendidos
app.get('/relatorios/produtos-mais-vendidos', (req, res) =>
    relatorioController.produtosMaisVendidos(req, res)
);

// Vendas por cliente
app.get('/relatorios/vendas-por-cliente', (req, res) =>
    relatorioController.vendasPorCliente(req, res)
);

// Consumo médio por cliente
app.get('/relatorios/consumo-medio', (req, res) =>
    relatorioController.consumoMedioPorCliente(req, res)
);

// Produtos com baixo estoque (?limite=5 é opcional)
app.get('/relatorios/baixo-estoque', (req, res) =>
    relatorioController.produtosBaixoEstoque(req, res)
);


app.listen(RELATORIO_PORT, () => {
    console.log(`📊 Canto do Silêncio - Serviço de Relatórios rodando na porta ${RELATORIO_PORT}`);
});

module.exports = app;
