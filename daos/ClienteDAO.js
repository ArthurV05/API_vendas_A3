const Cliente = require('../models/Cliente');

class ClienteDAO {

    constructor(pool) {
        this.pool = pool;
    }

    async listarTodos() {

        const resultado = await this.pool.query(
            'SELECT * FROM cliente'
        );

        return resultado.rows.map(row => 
            new Cliente(
                row.id,
                row.nome,
                row.email,
                row.telefone
            ) 
        );
    };

    async salvar(cliente) {

        const resultado = await this.pool.query(
            `
            INSERT INTO cliente 
            (nome, email, telefone) 
            VALUES ($1, $2, $3) 
            RETURNING *;
            `,
            [
                cliente.nome,
                cliente.email,
                cliente.telefone
            ]
        )

        const row = resultado.rows[0];

        return new Cliente(
            row.id,
            row.nome,
            row.email,
            row.telefone
        );
    };

    buscarPorId(id) {

        
    }

};

module.exports = ClienteDAO;