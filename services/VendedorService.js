class VendedorService {

    constructor(vendedorDAO) {
        this.vendedorDAO = vendedorDAO;
    }

    async listarTodos() {
        return await this.vendedorDAO.listarTodos();
    }

    async buscarPorId(id) {
        const vendedor = await this.vendedorDAO.buscarPorId(id);

        if (!vendedor) {
            throw new Error(`Vendedor com id ${id} não encontrado.`);
        }

        return vendedor;
    }

    async criar(dados) {
        if (!dados.nome || !dados.email) {
            throw new Error('Nome e email são obrigatórios.');
        }

        const Vendedor = require('../models/Vendedor');
        const novoVendedor = new Vendedor(null, dados.nome, dados.email);

        return await this.vendedorDAO.salvar(novoVendedor);
    }

    async atualizar(id, dados) {
        const vendedor = await this.vendedorDAO.buscarPorId(id);

        if (!vendedor) {
            throw new Error(`Vendedor com id ${id} não encontrado.`);
        }

        vendedor.nome = dados.nome ?? vendedor.nome;
        vendedor.email = dados.email ?? vendedor.email;

        return await this.vendedorDAO.atualizar(vendedor);
    }

    async deletar(id) {
        const vendedor = await this.vendedorDAO.buscarPorId(id);

        if (!vendedor) {
            throw new Error(`Vendedor com id ${id} não encontrado.`);
        }

        return await this.vendedorDAO.deletar(id);
    }

}

module.exports = VendedorService;
