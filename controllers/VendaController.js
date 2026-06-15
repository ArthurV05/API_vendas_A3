class VendaController {

    constructor(vendaService) {
        this.vendaService = vendaService;
    }

    async listarTodas(req, res) {
        try {
            const vendas = await this.vendaService.listarTodas();
            res.status(200).json(vendas);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const venda = await this.vendaService.buscarPorId(req.params.id);
            res.status(200).json(venda);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

    async criarPedido(req, res) {
        try {
            const venda = await this.vendaService.criarPedido(req.body);
            res.status(201).json(venda);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async cancelarPedido(req, res) {
        try {
            const venda = await this.vendaService.cancelarPedido(req.params.id);
            res.status(200).json(venda);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

}

module.exports = VendaController;
