class ClienteController {

    constructor(clienteService) {
        this.clienteService = clienteService;
    }

    async listarTodos(req, res) {
        try {
            const clientes = await this.clienteService.listarTodos();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const cliente = await this.clienteService.buscarPorId(req.params.id);
            res.status(200).json(cliente);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

    async criar(req, res) {
        try {
            const cliente = await this.clienteService.criar(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const cliente = await this.clienteService.atualizar(req.params.id, req.body);
            res.status(200).json(cliente);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        try {
            await this.clienteService.deletar(req.params.id);
            res.status(200).json({ mensagem: 'Cliente removido com sucesso.' });
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

}

module.exports = ClienteController;
