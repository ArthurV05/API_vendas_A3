class VendedorController {

    constructor(vendedorService) {
        this.vendedorService = vendedorService;
    }

    async listarTodos(req, res) {
        try {
            const vendedores = await this.vendedorService.listarTodos();
            res.status(200).json(vendedores);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const vendedor = await this.vendedorService.buscarPorId(req.params.id);
            res.status(200).json(vendedor);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

    async criar(req, res) {
        try {
            const vendedor = await this.vendedorService.criar(req.body);
            res.status(201).json(vendedor);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const vendedor = await this.vendedorService.atualizar(req.params.id, req.body);
            res.status(200).json(vendedor);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        try {
            await this.vendedorService.deletar(req.params.id);
            res.status(200).json({ mensagem: 'Vendedor removido com sucesso.' });
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

}

module.exports = VendedorController;
