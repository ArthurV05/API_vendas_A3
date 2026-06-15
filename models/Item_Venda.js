class Item_Venda {
    constructor(id, venda, produto, quantidade, preco_unitario) {
        this.id = id;
        this.venda = venda;
        this.produto = produto;
        this.quantidade = quantidade;
        this.preco_unitario = preco_unitario;
    }
}

module.exports = Item_Venda;