class RelatorioController {

    constructor(relatorioDAO) {
        this.relatorioDAO = relatorioDAO;
    }

    async produtosMaisVendidos(req, res) {
        try {
            const dados = await this.relatorioDAO.produtosMaisVendidos();
            res.status(200).json({
                relatorio: 'Produtos Mais Vendidos',
                geradoEm: new Date(),
                dados
            });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async vendasPorCliente(req, res) {
        try {
            const dados = await this.relatorioDAO.vendasPorCliente();
            res.status(200).json({
                relatorio: 'Vendas por Cliente',
                geradoEm: new Date(),
                dados
            });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async consumoMedioPorCliente(req, res) {
        try {
            const dados = await this.relatorioDAO.consumoMedioPorCliente();
            res.status(200).json({
                relatorio: 'Consumo Médio por Cliente (Ticket Médio)',
                geradoEm: new Date(),
                dados
            });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async produtosBaixoEstoque(req, res) {
        try {
            const limite = req.query.limite ? parseInt(req.query.limite) : 5;
            const dados = await this.relatorioDAO.produtosBaixoEstoque(limite);
            res.status(200).json({
                relatorio: 'Produtos com Baixo Estoque',
                limiteEstoque: limite,
                geradoEm: new Date(),
                dados
            });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

}

module.exports = RelatorioController;
