class cliente {
    constructor(id, nome, email, telefone) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
};

class vendedores {
    constructor(id, nome, setor) {
        this.id = id;
        this.nome = nome;
        this.setor = setor;
    }
};

class produtos {
    constructor(id, nome, preco, estoque) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }
};

class vendas {
    constructor(id, clienteId, vendedorId, produtoId, data) {
        this.id = id;
        this.clienteId = clienteId;
        this.vendedorId = vendedorId;
        this.produtoId = produtoId;
        this.data = data;
    }
};

class itensVenda {
    constructor(id, vendaId, produtoId, quantidade) {
        this.id = id;
        this.vendaId = vendaId;
        this.produtoId = produtoId;
        this.quantidade = quantidade;
    }
};