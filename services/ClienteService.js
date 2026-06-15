class ClienteService {

    constructor(clienteDAO) {
        this.clienteDAO = clienteDAO;
    }

    async listarTodos() {
        return await this.clienteDAO.listarTodos();
    }

    async buscarPorId(id) {
        const cliente = await this.clienteDAO.buscarPorId(id);

        if (!cliente) {
            throw new Error(`Cliente com id ${id} não encontrado.`);
        }

        return cliente;
    }

    async criar(dados) {
        if (!dados.nome || !dados.email || !dados.telefone) {
            throw new Error('Nome, email e telefone são obrigatórios.');
        }

        const Cliente = require('../models/Cliente');
        const novoCliente = new Cliente(null, dados.nome, dados.email, dados.telefone);

        return await this.clienteDAO.salvar(novoCliente);
    }

    async atualizar(id, dados) {
        const cliente = await this.clienteDAO.buscarPorId(id);

        if (!cliente) {
            throw new Error(`Cliente com id ${id} não encontrado.`);
        }

        cliente.nome = dados.nome ?? cliente.nome;
        cliente.email = dados.email ?? cliente.email;
        cliente.telefone = dados.telefone ?? cliente.telefone;

        return await this.clienteDAO.atualizar(cliente);
    }

    async deletar(id) {
        const cliente = await this.clienteDAO.buscarPorId(id);

        if (!cliente) {
            throw new Error(`Cliente com id ${id} não encontrado.`);
        }

        return await this.clienteDAO.deletar(id);
    }

}

module.exports = ClienteService;
