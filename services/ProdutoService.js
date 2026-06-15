class ProdutoService {

    constructor(produtoDAO) {
        this.produtoDAO = produtoDAO;
    }

    async listarTodos() {
        return await this.produtoDAO.listarTodos();
    }

    async buscarPorId(id) {
        const produto = await this.produtoDAO.buscarPorId(id);

        if (!produto) {
            throw new Error(`Produto com id ${id} não encontrado.`);
        }

        return produto;
    }

    async criar(dados) {
        if (!dados.nome || dados.preco === undefined || dados.quantidade_estoque === undefined) {
            throw new Error('Nome, preço e quantidade em estoque são obrigatórios.');
        }

        if (dados.preco < 0) {
            throw new Error('O preço não pode ser negativo.');
        }

        if (dados.quantidade_estoque < 0) {
            throw new Error('A quantidade em estoque não pode ser negativa.');
        }

        const Produto = require('../models/Produto');
        const novoProduto = new Produto(null, dados.nome, dados.preco, dados.quantidade_estoque);

        return await this.produtoDAO.salvar(novoProduto);
    }

    async atualizar(id, dados) {
        const produto = await this.produtoDAO.buscarPorId(id);

        if (!produto) {
            throw new Error(`Produto com id ${id} não encontrado.`);
        }

        if (dados.preco !== undefined && dados.preco < 0) {
            throw new Error('O preço não pode ser negativo.');
        }

        produto.nome = dados.nome ?? produto.nome;
        produto.preco = dados.preco ?? produto.preco;
        produto.quantidade_estoque = dados.quantidade_estoque ?? produto.quantidade_estoque;

        return await this.produtoDAO.atualizar(produto);
    }

    async atualizarEstoque(id, quantidade) {
        const produto = await this.produtoDAO.buscarPorId(id);

        if (!produto) {
            throw new Error(`Produto com id ${id} não encontrado.`);
        }

        if (quantidade < 0) {
            throw new Error('A quantidade em estoque não pode ser negativa.');
        }

        return await this.produtoDAO.atualizarEstoque(id, quantidade);
    }

    async deletar(id) {
        const produto = await this.produtoDAO.buscarPorId(id);

        if (!produto) {
            throw new Error(`Produto com id ${id} não encontrado.`);
        }

        return await this.produtoDAO.deletar(id);
    }

}

module.exports = ProdutoService;
