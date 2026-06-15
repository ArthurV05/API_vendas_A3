class RelatorioDAO {

    constructor(pool) {
        this.pool = pool;
    }

    // Produtos mais vendidos (quantidade total vendida)
    async produtosMaisVendidos() {
        const resultado = await this.pool.query(`
            SELECT 
                p.id,
                p.nome,
                SUM(iv.quantidade) AS total_vendido,
                SUM(iv.quantidade * iv.preco_unitario) AS receita_total
            FROM item_venda iv
            JOIN produto p ON iv.produto_id = p.id
            JOIN venda v ON iv.venda_id = v.id
            WHERE v.status = 'ativa'
            GROUP BY p.id, p.nome
            ORDER BY total_vendido DESC;
        `);

        return resultado.rows;
    }

    // Relatório de vendas por cliente
    async vendasPorCliente() {
        const resultado = await this.pool.query(`
            SELECT 
                c.id,
                c.nome AS cliente,
                c.email,
                COUNT(v.id) AS total_pedidos,
                SUM(v.valor_total) AS valor_total_gasto
            FROM cliente c
            LEFT JOIN venda v ON v.cliente_id = c.id AND v.status = 'ativa'
            GROUP BY c.id, c.nome, c.email
            ORDER BY valor_total_gasto DESC NULLS LAST;
        `);

        return resultado.rows;
    }

    // Consumo médio por cliente (ticket médio)
    async consumoMedioPorCliente() {
        const resultado = await this.pool.query(`
            SELECT 
                c.id,
                c.nome AS cliente,
                COUNT(v.id) AS total_pedidos,
                ROUND(AVG(v.valor_total)::numeric, 2) AS ticket_medio
            FROM cliente c
            JOIN venda v ON v.cliente_id = c.id
            WHERE v.status = 'ativa'
            GROUP BY c.id, c.nome
            ORDER BY ticket_medio DESC;
        `);

        return resultado.rows;
    }

    // Produtos com baixo estoque (menos de 5 unidades)
    async produtosBaixoEstoque(limite = 5) {
        const resultado = await this.pool.query(`
            SELECT 
                id,
                nome,
                quantidade_estoque,
                preco
            FROM produto
            WHERE quantidade_estoque <= $1
            ORDER BY quantidade_estoque ASC;
        `, [limite]);

        return resultado.rows;
    }

}

module.exports = RelatorioDAO;
