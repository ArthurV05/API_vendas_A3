class Venda {
    constructor(id, clienteId, vendedorId, dataVenda, valorTotal,status) {
        this.id = id;
        this.cliente = clienteId;
        this.vendedor = vendedorId;
        this.data_venda = dataVenda;
        this.valorTotal = valorTotal;
        this.status = status;
    }
}

module.exports = Venda;