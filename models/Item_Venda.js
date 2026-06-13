class Item_Venda {
    constructor(id, venda, produto, quantidade, valorUnitario) {
        this.id = id;
        this.venda = venda;
        this.produto = produto;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
    }
}

module.exports = Item_Venda;