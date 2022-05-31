CREATE DATABASE IF NOT EXISTS ecodb;
USE ecodb;

CREATE TABLE utilizador (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(50) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    nif             INT(9) NOT NULL UNIQUE,
    telemovel       INT(9) NOT NULL UNIQUE,
    morada          VARCHAR(250) NOT NULL,
    image           BLOB, -- Binary large object (verificar)
    pass_word       VARCHAR(250) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE consumidor (
    utilizador      INT PRIMARY KEY,
    --
    CONSTRAINT fk_consumidor
        FOREIGN KEY (utilizador) REFERENCES utilizador(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE fornecedor (
    utilizador      INT PRIMARY KEY,
    --
    CONSTRAINT fk_fornecedor
        FOREIGN KEY (utilizador) REFERENCES utilizador(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE localizacao (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    morada          VARCHAR(250) NOT NULL,
    c_postal        VARCHAR(8) NOT NULL,
    distrito        VARCHAR(20) NOT NULL,
    concelho        VARCHAR(20) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE armazem (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    localizacao     INT NOT NULL,
    --
    CONSTRAINT fk_armazem
        FOREIGN KEY (localizacao) REFERENCES localizacao(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE lista_armazens (
    fornecedor      INT,
    armazem         INT,
    --
    CONSTRAINT pk_armazens
        PRIMARY KEY (fornecedor,armazem),
    CONSTRAINT fk_forn_id
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador),
    CONSTRAINT fk_armazem_id
        FOREIGN KEY (armazem) REFERENCES armazem(id)
) ENGINE = InnoDB;

CREATE TABLE transportador (
    utilizador      INT PRIMARY KEY,
    localizacao     INT,
    --
    CONSTRAINT fk_transportador
        FOREIGN KEY (utilizador) REFERENCES utilizador(id) ON DELETE CASCADE,
    CONSTRAINT fk_localizacao
        FOREIGN KEY (localizacao) REFERENCES localizacao(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE veiculo (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    condicoes       VARCHAR(250) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE lista_veiculos (
    transportador   INT,
    veiculo         INT,
    --
    CONSTRAINT pk_veiculos
        PRIMARY KEY (transportador,veiculo),
    CONSTRAINT fk_transp_id
        FOREIGN KEY (transportador) REFERENCES transportador(utilizador),
    CONSTRAINT fk_veiculo_id
        FOREIGN KEY (veiculo) REFERENCES veiculo(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE encomenda (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    data            DATE NOT NULL
) ENGINE = InnoDB;

CREATE TABLE estado_encomenda (
    encomenda       INT PRIMARY KEY,
    status_consum   VARCHAR(3) NOT NULL, 
    status_fornec   VARCHAR(3) NOT NULL, 
    status_transp   VARCHAR(3) NOT NULL, 
    --
    CONSTRAINT fk_encomenda_status
        FOREIGN KEY (encomenda) REFERENCES encomenda(id) ON DELETE CASCADE,
    CONSTRAINT ck_status
        CHECK ((status_consum = 'NO' OR status_consum = 'YES') 
            AND (status_fornec = 'NO' OR status_fornec = 'YES')
            AND (status_transp = 'NO' OR status_transp = 'YES'))
) ENGINE = InnoDB;

CREATE TABLE lista_encomendas (
    consumidor      INT,
    encomenda       INT,
    fornecedor      INT,
    --
    CONSTRAINT pk_encomendas
        PRIMARY KEY (consumidor,encomenda,fornecedor),
    CONSTRAINT fk_consumidor_id
        FOREIGN KEY (consumidor) REFERENCES consumidor(utilizador),
    CONSTRAINT fk_encomenda_id
        FOREIGN KEY (encomenda) REFERENCES encomenda(id) ON DELETE CASCADE,
    CONSTRAINT fk_fornecedor_id
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador)
) ENGINE = InnoDB;

CREATE TABLE transportar_encomendas (
    encomenda       INT,
    transportador   INT,
    --
    CONSTRAINT pk_transportar_encomendas
        PRIMARY KEY (encomenda, transportador),
    CONSTRAINT fk_encomenda_ptransp
        FOREIGN KEY (encomenda) REFERENCES encomenda(id) ON DELETE CASCADE,
    CONSTRAINT fk_atransportar
        FOREIGN KEY (transportador) REFERENCES transportador(utilizador) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE tipo_produto (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(150) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE subtipo_produto (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(150) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE tipo_subtipo (
    tipo            INT,
    subtipo         INT,
    --
    CONSTRAINT pk_tipo_subtipo
        PRIMARY KEY (tipo,subtipo),
    CONSTRAINT fk_tipo_lista
        FOREIGN KEY (tipo) REFERENCES tipo_produto(id) ON DELETE CASCADE,
    CONSTRAINT fk_subtipo_lista
        FOREIGN KEY (subtipo) REFERENCES subtipo_produto(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE cadeia_logistica (
    id              INT PRIMARY KEY AUTO_INCREMENT
) ENGINE = InnoDB;

CREATE TABLE produto (
    id              INT NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(150) NOT NULL,
    fornecedor      INT NOT NULL,
    producao        DATE NOT NULL,
    preco           NUMERIC(5,2) NOT NULL,
    tipo            INT NOT NULL,
    subtipo         INT NOT NULL,
    cadeia_logis    INT NOT NULL, -- verificar... não fará mais sentido na cadeia logistica chamar-mos o produto?
    --
    CONSTRAINT pk_produto
        PRIMARY KEY (id, fornecedor),
    CONSTRAINT fk_fornecedor_produto
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador),
    CONSTRAINT fk_tipo
        FOREIGN KEY (tipo) REFERENCES tipo_produto(id),
    CONSTRAINT fk_subtipo
        FOREIGN KEY (subtipo) REFERENCES subtipo_produto(id),
    CONSTRAINT fk_cadeia_produto
        FOREIGN KEY (cadeia_logis) REFERENCES cadeia_logistica(id),
    CONSTRAINT ck_preco
        CHECK (preco > 0.0)
) ENGINE = InnoDB;

CREATE TABLE cesto_compras (
    consumidor      INT,
    produto         INT,
    --
    CONSTRAINT pk_cesto_compras
        PRIMARY KEY (consumidor,produto),
    CONSTRAINT fk_cesto_consumidor
        FOREIGN KEY (consumidor) REFERENCES consumidor(utilizador) ON DELETE CASCADE,
    CONSTRAINT fk_cesto_produto
        FOREIGN KEY (produto) REFERENCES produto(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE lista_produtos_encomenda (
    encomenda       INT,
    produto         INT,
    --
    CONSTRAINT pk_lista_produtos_encomenda
        PRIMARY KEY (encomenda,produto),
    CONSTRAINT fk_encomenda_cprodutos
        FOREIGN KEY (encomenda) REFERENCES encomenda(id) ON DELETE CASCADE,
    CONSTRAINT fk_produtos_encomenda
        FOREIGN KEY (produto) REFERENCES produto(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE recurso (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(150) NOT NULL,
    un_medida       VARCHAR(25) NOT NULL,
    quantidade      NUMERIC(10,3) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE lista_recursos (
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

CREATE TABLE poluicao (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(150) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE poluicao_cadeia (
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

CREATE TABLE emite_poluicao (
    veiculo         INT,
    poluicao        INT,
    quantidade      NUMERIC(10,3),
    --
    CONSTRAINT pk_emite_poluicao
        PRIMARY KEY (veiculo,poluicao),
    CONSTRAINT fk_veiculo_polui
        FOREIGN KEY (veiculo) REFERENCES veiculo(id),
    CONSTRAINT fk_poluicao_emitida
        FOREIGN KEY (poluicao)  REFERENCES poluicao(id)
) ENGINE = InnoDB;