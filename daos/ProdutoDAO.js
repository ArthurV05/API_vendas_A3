const Produto = require('../models/Produto');

class ProdutoDAO {

    constructor(pool) {
        this.pool = pool;
    }

    async listarTodos() {

        const resultado = await this.pool.query(
            'SELECT * FROM produto'
        );

        return resultado.rows.map(row =>
            new Produto(
                row.id,
                row.nome,
                row.preco,
                row.quantidade_estoque
            )
        );
    };

    async salvar(produto) {

        const resultado = await this.pool.query(
            `
            INSERT INTO produto 
            (nome, preco, quantidade_estoque) 
            VALUES ($1, $2, $3) 
            RETURNING *;
            `,
            [
                produto.nome,
                produto.preco,
                produto.quantidade_estoque
            ]
        );

        const row = resultado.rows[0];

        return new Produto(
            row.id,
            row.nome,
            row.preco,
            row.quantidade_estoque
        );
    };

    async buscarPorId(id) {

        const resultado = await this.pool.query(
            'SELECT * FROM produto WHERE id = $1',
            [id]
        );

        if (resultado.rows.length === 0) return null;

        const row = resultado.rows[0];

        return new Produto(
            row.id,
            row.nome,
            row.preco,
            row.quantidade_estoque
        );
    };

    async atualizar(produto) {

        const resultado = await this.pool.query(
            `
            UPDATE produto 
            SET nome = $1, preco = $2, quantidade_estoque = $3
            WHERE id = $4
            RETURNING *;
            `,
            [
                produto.nome,
                produto.preco,
                produto.quantidade_estoque,
                produto.id
            ]
        );

        if (resultado.rows.length === 0) return null;

        const row = resultado.rows[0];

        return new Produto(
            row.id,
            row.nome,
            row.preco,
            row.quantidade_estoque
        );
    };

    async atualizarEstoque(id, novaQuantidade) {

        const resultado = await this.pool.query(
            `
            UPDATE produto 
            SET quantidade_estoque = $1
            WHERE id = $2
            RETURNING *;
            `,
            [novaQuantidade, id]
        );

        if (resultado.rows.length === 0) return null;

        const row = resultado.rows[0];

        return new Produto(
            row.id,
            row.nome,
            row.preco,
            row.quantidade_estoque
        );
    };

    async deletar(id) {

        const resultado = await this.pool.query(
            'DELETE FROM produto WHERE id = $1 RETURNING *',
            [id]
        );

        return resultado.rowCount > 0;
    };

};

module.exports = ProdutoDAO;
