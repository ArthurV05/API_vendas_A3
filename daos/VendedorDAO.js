const Vendedor = require('../models/Vendedor');

class VendedorDAO {

    constructor(pool) {
        this.pool = pool;
    }

    async listarTodos() {

        const resultado = await this.pool.query(
            'SELECT * FROM vendedor'
        );

        return resultado.rows.map(row =>
            new Vendedor(
                row.id,
                row.nome,
                row.email
            )
        );
    };

    async salvar(vendedor) {

        const resultado = await this.pool.query(
            `
            INSERT INTO vendedor 
            (nome, email) 
            VALUES ($1, $2) 
            RETURNING *;
            `,
            [
                vendedor.nome,
                vendedor.email
            ]
        );

        const row = resultado.rows[0];

        return new Vendedor(
            row.id,
            row.nome,
            row.email
        );
    };

    async buscarPorId(id) {

        const resultado = await this.pool.query(
            'SELECT * FROM vendedor WHERE id = $1',
            [id]
        );

        if (resultado.rows.length === 0) return null;

        const row = resultado.rows[0];

        return new Vendedor(
            row.id,
            row.nome,
            row.email
        );
    };

    async atualizar(vendedor) {

        const resultado = await this.pool.query(
            `
            UPDATE vendedor 
            SET nome = $1, email = $2
            WHERE id = $3
            RETURNING *;
            `,
            [
                vendedor.nome,
                vendedor.email,
                vendedor.id
            ]
        );

        if (resultado.rows.length === 0) return null;

        const row = resultado.rows[0];

        return new Vendedor(
            row.id,
            row.nome,
            row.email
        );
    };

    async deletar(id) {

        const resultado = await this.pool.query(
            'DELETE FROM vendedor WHERE id = $1 RETURNING *',
            [id]
        );

        return resultado.rowCount > 0;
    };

};

module.exports = VendedorDAO;
