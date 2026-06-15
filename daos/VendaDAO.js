const Venda = require('../models/Venda');

class VendaDAO {

    constructor(pool) {
        this.pool = pool;
    }

    async listarTodas() {

        const resultado = await this.pool.query(
            'SELECT * FROM venda'
        );

        return resultado.rows.map(row =>
            new Venda(
                row.id,
                row.cliente_id,
                row.vendedor_id,
                row.data_venda,
                row.valor_total,
                row.status
            )
        );
    };

    async salvar(venda) {

        const resultado = await this.pool.query(
            `
            INSERT INTO venda 
            (cliente_id, vendedor_id, data_venda, valor_total, status) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
            `,
            [
                venda.cliente,
                venda.vendedor,
                venda.data_venda,
                venda.valorTotal,
                venda.status
            ]
        );

        const row = resultado.rows[0];

        return new Venda(
            row.id,
            row.cliente_id,
            row.vendedor_id,
            row.data_venda,
            row.valor_total,
            row.status
        );
    };

    async buscarPorId(id) {

        const resultado = await this.pool.query(
            'SELECT * FROM venda WHERE id = $1',
            [id]
        );

        if (resultado.rows.length === 0) return null;

        const row = resultado.rows[0];

        return new Venda(
            row.id,
            row.cliente_id,
            row.vendedor_id,
            row.data_venda,
            row.valor_total,
            row.status
        );
    };

    async atualizarStatus(id, novoStatus) {

        const resultado = await this.pool.query(
            `
            UPDATE venda 
            SET status = $1
            WHERE id = $2
            RETURNING *;
            `,
            [novoStatus, id]
        );

        if (resultado.rows.length === 0) return null;

        const row = resultado.rows[0];

        return new Venda(
            row.id,
            row.cliente_id,
            row.vendedor_id,
            row.data_venda,
            row.valor_total,
            row.status
        );
    };

    async listarPorCliente(clienteId) {

        const resultado = await this.pool.query(
            'SELECT * FROM venda WHERE cliente_id = $1',
            [clienteId]
        );

        return resultado.rows.map(row =>
            new Venda(
                row.id,
                row.cliente_id,
                row.vendedor_id,
                row.data_venda,
                row.valor_total,
                row.status
            )
        );
    };

};

module.exports = VendaDAO;
