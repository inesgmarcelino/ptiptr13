CREATE DATABASE IF NOT EXISTS eco_db;
ALTER DATABASE eco_db CHARACTER SET utf8 COLLATE utf8_general_ci;
USE eco_db;

CREATE TABLE IF NOT EXISTS papeis (
    id INT PRIMARY KEY,
    descr VARCHAR(22) NOT NULL
) ENGINE = InnoDB;

-- INSERT INTO papeis VALUES (1,"Consumidor");
-- INSERT INTO papeis VALUES (2,"Fornecedor");
-- INSERT INTO papeis VALUES (3,"Consumidor/Fornecedor");
-- INSERT INTO papeis VALUES (4,"Transportador");

CREATE TABLE IF NOT EXISTS utilizador (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(50) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    nif             INT(9) NOT NULL UNIQUE,
    phone       INT(9) NOT NULL UNIQUE,
    passwd       VARCHAR(250) NOT NULL,
    papel       INT(1) NOT NULL,

    CONSTRAINT fk_role FOREIGN KEY (papel) REFERENCES papeis(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS distrito(
    id INT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS concelho(
    id INT UNIQUE NOT NULL,
    nome VARCHAR(50) UNIQUE NOT NULL,
    distrito INT UNIQUE NOT NULL,

    CONSTRAINT prim_conc PRIMARY KEY(distrito,id),
    CONSTRAINT fk_dist FOREIGN KEY (distrito) REFERENCES distrito(id)
) ENGINE = InnoDB;

-- Antes de introduzir nova morada, verificar quantas o utilizador ja tem
CREATE TABLE IF NOT EXISTS morada(
    id INT NOT NULL,
    user INT NOT NULL,
    prefix INT(4) NOT NULL,
    sufix INT(3) DEFAULT NULL,
    street VARCHAR(100),
    dist INT NOT NULL,
    conc INT NOT NULL,
    store INT UNIQUE DEFAULT NULL,
    lat DECIMAL(9,7) NOT NULL,
    lng DECIMAL(10,7) NOT NULL,

    CONSTRAINT prim_morada PRIMARY KEY (user,id),
    CONSTRAINT fk_mor_user FOREIGN KEY (user) REFERENCES utilizador(id) ON DELETE CASCADE,
    CONSTRAINT fk_mor_dist FOREIGN KEY (dist) REFERENCES distrito(id),
    CONSTRAINT fk_mor_conc FOREIGN KEY (conc) REFERENCES concelho(id)

) ENGINE = InnoDB;

-- cada armazem tem o seu id e pode ser identificado pela sua morada
CREATE TABLE IF NOT EXISTS armazem (
    id              INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user            INT NOT NULL,
    morada          INT UNIQUE NOT NULL,
    --

    CONSTRAINT fk_user FOREIGN KEY (morada,user) REFERENCES morada(user,id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tipo_consumo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(20)
) ENGINE = InnoDB;

-- INSERT INTO tipo_consumo VALUES(1,"Gasolina");
-- INSERT INTO tipo_consumo VALUES(2,"Gasóleo");
-- INSERT INTO tipo_consumo VALUES(3,"GPL");
-- INSERT INTO tipo_consumo VALUES(4,"Elétrico");
-- INSERT INTO tipo_consumo VALUES(5,"Híbrido"); -- acho que deviamos tirar este

CREATE TABLE IF NOT EXISTS veiculo (
    id INT UNIQUE NOT NULL AUTO_INCREMENT,
    transp INT UNIQUE NOT NULL,
    marca VARCHAR(50) NOT NULL,
    ano INT(4) NOT NULL,
    fuel   INT(1) NOT NULL, -- 1 -> Gasolina, 2 -> Gasóleo, 3 -> GPL, 4 -> Elétrico, 5 -> Híbrido
    consumo DECIMAL(4,2) NOT NULL, -- unidade/km (unidade varia consoante o tipo do consumo)
    plate  VARCHAR(6) UNIQUE NOT NULL, -- matricula

    CONSTRAINT prim_car PRIMARY KEY (transp,id),
    CONSTRAINT fk_car_transp FOREIGN KEY (transp) REFERENCES utilizador(id) ON DELETE CASCADE,
    CONSTRAINT chk_fuel CHECK (fuel = 1 OR fuel = 2 OR fuel = 3 OR fuel = 4 OR fuel = 5)
) ENGINE = InnoDB;

-- Relaciona uma encomenda com um consumido
-- Uma encomenda pode ser feita a multiplos fornecedores

CREATE TABLE IF NOT EXISTS categoria (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS subcategoria(
    id              INT NOT NULL UNIQUE AUTO_INCREMENT,
    nome            VARCHAR(50) NOT NULL,
    categoria       INT NOT NULL,

    CONSTRAINT prim_subcat PRIMARY KEY(categoria,id),
    CONSTRAINT fk_catgry FOREIGN KEY (categoria) REFERENCES categoria(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS produto (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    dscp        VARCHAR(340),
    catg        INT NOT NULL,
    subcatg     INT NOT NULL,

    CONSTRAINT prod_catg FOREIGN KEY (catg) REFERENCES categoria(id),
    CONSTRAINT prod_sbcatb FOREIGN KEY (catg,subcatg) REFERENCES subcategoria(categoria,id)
) ENGINE = InnoDB;

-- permite obter produtos filtrando por fornecedor, armazem do fornecedor ou por produto
CREATE TABLE IF NOT EXISTS stock(
    id          INT UNIQUE NOT NULL AUTO_INCREMENT,
    forn        INT NOT NULL,
    store       INT NOT NULL,
    produ       INT NOT NULL,
    qtty        INT NOT NULL DEFAULT 0,
    preco       DECIMAL(7,2) NOT NULL DEFAULT (00000.00),
    due         DATE DEFAULT NULL, -- DATA DE VALIDADE

    -- CONSTRAINT prim_stock PRIMARY KEY(forn,store,produ), -> Nao permite  
    -- adicionar multiplas instancias do mesmo produto com diferentes datas de validade (por exemplo)
    CONSTRAINT prim_u_stock PRIMARY KEY (forn,id),
    CONSTRAINT fk_stock_user FOREIGN KEY (forn) REFERENCES utilizador(id),
    CONSTRAINT fk_store_stock FOREIGN KEY (store) REFERENCES armazem(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS encomenda (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    cons            INT NOT NULL,
    tpurchase       DATE NOT NULL, -- time of purchase: timestamp
    total           DECIMAL(7,2) DEFAULT (00000.00),

    CONSTRAINT fk_order_user FOREIGN KEY (cons) REFERENCES utilizador(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS estado_despacho(    
    id INT(1) PRIMARY KEY,
    descr VARCHAR(25) NOT NULL
) ENGINE = InnoDB;

INSERT INTO estado_despacho VALUES (1,"A processar..."); -- Transportador ainda nao viu a encomenda
INSERT INTO estado_despacho VALUES (2,"Por enviar..."); -- Transportador processou a encomenda mas ainda nao enviou
INSERT INTO estado_despacho VALUES (3,"Em Expedição.");
INSERT INTO estado_despacho VALUES (4,"Entregue.");

-- tabela que relaciona uma encomenda com os diferentes transportadores
CREATE TABLE IF NOT EXISTS despacho (
    order INT NOT NULL,
    forn INT NOT NULL,
    estado INT NOT NULL,
    transp INT DEFAULT NULL, -- inicialmente n temos transportadora atribuida
    vehic INT DEFAULT NULL, -- inicialmente n temos um veiculo atribuido

    CONSTRAINT prim_despch PRIMARY KEY (order, forn),
    CONSTRAINT fk_status FOREIGN KEY (estado) REFERENCES estado_despacho(id),
    CONSTRAINT fk_order FOREIGN KEY (order) REFERENCES encomenda(id),
    CONSTRAINT fk_vehic FOREIGN KEY (transp,vehic) REFERENCES veiculo(transp,vehic),
    CONSTRAINT chk_status CHECK ((estado > 0) AND (estado < 5))
) ENGINE = InnoDB;

-- relaciona os produtos com o despacho de cada fornecedor (permite ter uma encomenda com multiplos fornecedores)
CREATE TABLE IF NOT EXISTS encomenda_prods (
    order INT UNIQUE NOT NULL,
    forn INT NOT NULL,
    prod INT NOT NULL,
    qtty INT NOT NULL,
    price DECIMAL(7,2) NOT NULL DEFAULT (00000.00), -- preco por unidade(util guardar em caso de descontos)

    CONSTRAINT prim_ord_prod PRIMARY KEY (order,forn,prod),
    CONSTRAINT fk_order FOREIGN KEY (order,forn) REFERENCES despacho(order,forn)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cesto_compras(
    cons       INT UNIQUE NOT NULL,
    forn       INT NOT NULL,
    prod       INT NOT NULL,
    qtty       INT NOT NULL DEFAULT 1,

    CONSTRAINT prim_cart PRIMARY KEY(cons,forn,prod),
    CONSTRAINT fk_cart_cons FOREIGN KEY (cons) REFERENCES utilizador(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_prod FOREIGN KEY (forn,prod) REFERENCES stock(forn,id) ON DELETE CASCADE
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS cadeia_logistica (
    id              INT PRIMARY KEY AUTO_INCREMENT
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS recurso (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(150) NOT NULL,
    un_medida       VARCHAR(25) NOT NULL,
    quantidade      NUMERIC(10,3) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS lista_recursos (
    cadeia_logis    INT,
    recurso         INT,
    --
    CONSTRAINT pk_lista_recursos
        PRIMARY KEY (cadeia_logis,recurso),
    CONSTRAINT fk_cadeia_logis
        FOREIGN KEY (cadeia_logis) REFERENCES cadeia_logistica(id),
    CONSTRAINT fk_recurso
        FOREIGN KEY (recurso) REFERENCES recurso(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS poluicao (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(150) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS poluicao_cadeia (
    cadeia_logis    INT,
    poluicao        INT,
    quantidade      NUMERIC(10,3) NOT NULL,
    --
    CONSTRAINT pk_poluicao_cadeia
        PRIMARY KEY (cadeia_logis,poluicao),
    CONSTRAINT fk_cadeia_logis_poluicao
        FOREIGN KEY (cadeia_logis) REFERENCES cadeia_logistica(id),
    CONSTRAINT fk_poluicao_cadeia
        FOREIGN KEY (poluicao)  REFERENCES poluicao(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS emite_poluicao (
    veiculo         INT,
    poluicao        INT,
    quantidade      NUMERIC(10,3),
    --
    CONSTRAINT pk_emite_poluicao
        PRIMARY KEY (veiculo,poluicao),
    CONSTRAINT fk_veiculo_polui
        FOREIGN KEY (veiculo) REFERENCES veiculo(id) ON DELETE CASCADE,
    CONSTRAINT fk_poluicao_emitida
        FOREIGN KEY (poluicao)  REFERENCES poluicao(id)
) ENGINE = InnoDB;

INSERT INTO utilizador (nome, email, nif, telemovel, pass_word, morada) VALUES ('Admin','admin@ecomarket.pt', 000000000,000000000, 'adminOK', 'Administração');


-- Inserts de Distritos e Concelhos
--
INSERT INTO tipo_produto (nome) VALUES ('Alimentao');
INSERT INTO tipo_produto (nome) VALUES ('Livros');
INSERT INTO tipo_produto (nome) VALUES ('Tecnologia');
INSERT INTO tipo_produto (nome) VALUES ('Casa');
INSERT INTO tipo_produto (nome) VALUES ('Crianas');
INSERT INTO tipo_produto (nome) VALUES ('Beleza');
INSERT INTO tipo_produto (nome) VALUES ('Desporto');
INSERT INTO tipo_produto (nome) VALUES ('Animais');

INSERT INTO subtipo_produto (nome) VALUES ('Legumes');
INSERT INTO subtipo_produto (nome) VALUES ('Fruta');
INSERT INTO subtipo_produto (nome) VALUES ('Congelados');

INSERT INTO tipo_subtipo VALUES (1,1);
INSERT INTO tipo_subtipo VALUES (1,2);
INSERT INTO tipo_subtipo VALUES (1,3);
INSERT INTO subtipo_produto (nome) VALUES ('Universitrio');
INSERT INTO subtipo_produto (nome) VALUES ('Thriller');
INSERT INTO subtipo_produto (nome) VALUES ('Romance');

INSERT INTO tipo_subtipo VALUES (2,4);
INSERT INTO tipo_subtipo VALUES (2,5);
INSERT INTO tipo_subtipo VALUES (2,6);