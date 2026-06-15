const Item_Venda = require('../models/Item_Venda');

class Item_VendaDAO {

    constructor(pool) {
        this.pool = pool;
    }

    async salvar(item) {

        const resultado = await this.pool.query(
            `
            INSERT INTO item_venda 
            (venda_id, produto_id, quantidade, preco_unitario) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
            `,
            [
                item.venda,
                item.produto,
                item.quantidade,
                item.preco_unitario
            ]
        );

        const row = resultado.rows[0];

        return new Item_Venda(
            row.id,
            row.venda_id,
            row.produto_id,
            row.quantidade,
            row.preco_unitario
        );
    };

    async listarPorVenda(vendaId) {

        const resultado = await this.pool.query(
            `
            SELECT iv.*, p.nome AS produto_nome
            FROM item_venda iv
            JOIN produto p ON iv.produto_id = p.id
            WHERE iv.venda_id = $1
            `,
            [vendaId]
        );

        return resultado.rows.map(row =>
            new Item_Venda(
                row.id,
                row.venda_id,
                row.produto_id,
                row.quantidade,
                row.preco_unitario
            )
        );
    };

    async deletarPorVenda(vendaId) {

        const resultado = await this.pool.query(
            'DELETE FROM item_venda WHERE venda_id = $1',
            [vendaId]
        );

        return resultado.rowCount > 0;
    };

};

module.exports = Item_VendaDAO;
