const Venda = require('../models/Venda');
const Item_Venda = require('../models/Item_Venda');

class VendaService {

    constructor(vendaDAO, itemVendaDAO, produtoDAO, clienteDAO, vendedorDAO) {
        this.vendaDAO = vendaDAO;
        this.itemVendaDAO = itemVendaDAO;
        this.produtoDAO = produtoDAO;
        this.clienteDAO = clienteDAO;
        this.vendedorDAO = vendedorDAO;
    }

    async listarTodas() {
        return await this.vendaDAO.listarTodas();
    }

    async buscarPorId(id) {
        const venda = await this.vendaDAO.buscarPorId(id);

        if (!venda) {
            throw new Error(`Venda com id ${id} não encontrada.`);
        }

        const itens = await this.itemVendaDAO.listarPorVenda(id);
        venda.itens = itens;

        return venda;
    }

    async criarPedido(dados) {
        // Validações básicas
        if (!dados.clienteId || !dados.vendedorId || !dados.itens || dados.itens.length === 0) {
            throw new Error('Cliente, vendedor e ao menos um item são obrigatórios.');
        }

        // Verifica se cliente e vendedor existem
        const cliente = await this.clienteDAO.buscarPorId(dados.clienteId);
        if (!cliente) throw new Error(`Cliente com id ${dados.clienteId} não encontrado.`);

        const vendedor = await this.vendedorDAO.buscarPorId(dados.vendedorId);
        if (!vendedor) throw new Error(`Vendedor com id ${dados.vendedorId} não encontrado.`);

        // Valida estoque e calcula valor total
        let valorTotal = 0;

        for (const item of dados.itens) {
            const produto = await this.produtoDAO.buscarPorId(item.produtoId);

            if (!produto) {
                throw new Error(`Produto com id ${item.produtoId} não encontrado.`);
            }

            if (produto.quantidade_estoque < item.quantidade) {
                throw new Error(`Estoque insuficiente para o produto "${produto.nome}". Disponível: ${produto.quantidade_estoque}.`);
            }

            valorTotal += produto.preco * item.quantidade;
        }

        // Cria a venda
        const novaVenda = new Venda(
            null,
            dados.clienteId,
            dados.vendedorId,
            new Date(),
            valorTotal,
            'ativa'
        );

        const vendaSalva = await this.vendaDAO.salvar(novaVenda);

        // Cria os itens e atualiza o estoque
        const itensSalvos = [];

        for (const item of dados.itens) {
            const produto = await this.produtoDAO.buscarPorId(item.produtoId);

            const novoItem = new Item_Venda(
                null,
                vendaSalva.id,
                item.produtoId,
                item.quantidade,
                produto.preco
            );

            const itemSalvo = await this.itemVendaDAO.salvar(novoItem);
            itensSalvos.push(itemSalvo);

            // Baixa no estoque
            const novaQuantidade = produto.quantidade_estoque - item.quantidade;
            await this.produtoDAO.atualizarEstoque(item.produtoId, novaQuantidade);
        }

        vendaSalva.itens = itensSalvos;
        return vendaSalva;
    }

    async cancelarPedido(id) {
        const venda = await this.vendaDAO.buscarPorId(id);

        if (!venda) {
            throw new Error(`Venda com id ${id} não encontrada.`);
        }

        if (venda.status === 'cancelada') {
            throw new Error('Esta venda já está cancelada.');
        }

        // Devolve os itens ao estoque
        const itens = await this.itemVendaDAO.listarPorVenda(id);

        for (const item of itens) {
            const produto = await this.produtoDAO.buscarPorId(item.produto);
            const novaQuantidade = produto.quantidade_estoque + item.quantidade;
            await this.produtoDAO.atualizarEstoque(item.produto, novaQuantidade);
        }

        return await this.vendaDAO.atualizarStatus(id, 'cancelada');
    }

}

module.exports = VendaService;
