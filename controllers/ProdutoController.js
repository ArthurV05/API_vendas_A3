class ProdutoController {

    constructor(produtoService) {
        this.produtoService = produtoService;
    }

    async listarTodos(req, res) {
        try {
            const produtos = await this.produtoService.listarTodos();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const produto = await this.produtoService.buscarPorId(req.params.id);
            res.status(200).json(produto);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

    async criar(req, res) {
        try {
            const produto = await this.produtoService.criar(req.body);
            res.status(201).json(produto);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const produto = await this.produtoService.atualizar(req.params.id, req.body);
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async atualizarEstoque(req, res) {
        try {
            const { quantidade } = req.body;
            const produto = await this.produtoService.atualizarEstoque(req.params.id, quantidade);
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        try {
            await this.produtoService.deletar(req.params.id);
            res.status(200).json({ mensagem: 'Produto removido com sucesso.' });
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

}

module.exports = ProdutoController;
