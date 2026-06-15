
-- Script de inicialização do banco


-- Tabelas
CREATE TABLE IF NOT EXISTS cliente (
    id       SERIAL PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) UNIQUE,
    telefone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS vendedor (
    id    SERIAL PRIMARY KEY,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS produto (
    id                 SERIAL PRIMARY KEY,
    nome               VARCHAR(100)   NOT NULL,
    preco              DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INTEGER        NOT NULL DEFAULT 0,
    CONSTRAINT chk_estoque_nao_negativo CHECK (quantidade_estoque >= 0)
);

CREATE TABLE IF NOT EXISTS venda (
    id          SERIAL PRIMARY KEY,
    cliente_id  INTEGER        NOT NULL,
    vendedor_id INTEGER        NOT NULL,
    data_venda  TIMESTAMP      NOT NULL DEFAULT NOW(),
    valor_total DECIMAL(10, 2) NOT NULL,
    status      VARCHAR(20)    NOT NULL DEFAULT 'ativa',
    CONSTRAINT fk_venda_cliente  FOREIGN KEY (cliente_id)  REFERENCES cliente(id),
    CONSTRAINT fk_venda_vendedor FOREIGN KEY (vendedor_id) REFERENCES vendedor(id),
    CONSTRAINT chk_status_venda  CHECK (status IN ('ativa', 'cancelada'))
);

CREATE TABLE IF NOT EXISTS item_venda (
    id             SERIAL PRIMARY KEY,
    venda_id       INTEGER        NOT NULL,
    produto_id     INTEGER        NOT NULL,
    quantidade     INTEGER        NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_item_venda    FOREIGN KEY (venda_id)   REFERENCES venda(id),
    CONSTRAINT fk_produto_venda FOREIGN KEY (produto_id) REFERENCES produto(id)
);


--  Dados iniciais

-- 5 Clientes
INSERT INTO cliente (nome, email, telefone) VALUES
    ('Ana Luz',        'ana.luz@email.com',        '(11) 91111-1111'),
    ('Bruno Calmo',    'bruno.calmo@email.com',    '(21) 92222-2222'),
    ('Clara Silêncio', 'clara.silencio@email.com', '(31) 93333-3333'),
    ('Diego Quieto',   'diego.quieto@email.com',   '(41) 94444-4444'),
    ('Elena Serena',   'elena.serena@email.com',   '(51) 95555-5555')
ON CONFLICT DO NOTHING;

-- 2 Vendedores
INSERT INTO vendedor (nome, email) VALUES
    ('Lucas Introvertido', 'lucas@cantodosilencio.com'),
    ('Mariana Reservada',  'mariana@cantodosilencio.com')
ON CONFLICT DO NOTHING;

-- 10 Produtos
INSERT INTO produto (nome, preco, quantidade_estoque) VALUES
    ('Fone de Ouvido com Cancelamento de Ruído',  349.90, 30),
    ('Livro: O Poder dos Introvertidos',            59.90, 50),
    ('Luminária LED para Leitura',                  89.90, 25),
    ('Diário de Couro para Anotações',              49.90, 40),
    ('Kit de Chás Relaxantes (12 sabores)',          39.90, 60),
    ('Almofada de Meditação',                        79.90, 20),
    ('Quebra-Cabeça 1000 Peças - Floresta',         69.90, 35),
    ('Planta Suculenta com Vaso Minimalista',        34.90, 45),
    ('Máscara de Dormir com Bloqueio de Luz',        29.90, 55),
    ('Cobertor Ponderado Anti-Ansiedade',           199.90, 15)
ON CONFLICT DO NOTHING;
z