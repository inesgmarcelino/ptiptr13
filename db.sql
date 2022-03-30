CREATE TABLE utilizador (
    id              NUMERIC PRIMARY KEY,
    nome            VARCHAR(50) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    nif             NUMERIC(9) NOT NULL UNIQUE,
    telemovel       NUMERIC(9) NOT NULL UNIQUE,
    image           BLOB, -- Binary large object (verificar)
    pass_word       VARCHAR(250) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE consumidor (
    utilizador      NUMERIC PRIMARY KEY,
    morada          VARCHAR(250) NOT NULL,
    --
    CONSTRAINT fk_consumidor
        FOREIGN KEY (utilizador) REFERENCES utilizador(id)
) ENGINE = InnoDB;

CREATE TABLE fornecedor (
    utilizador      NUMERIC PRIMARY KEY,
    --
    CONSTRAINT fk_fornecedor
        FOREIGN KEY (utilizador) REFERENCES utilizador(id)
) ENGINE = InnoDB;

CREATE TABLE localizacao (
    id              NUMERIC PRIMARY KEY,
    morada          VARCHAR(250) NOT NULL,
    c_postal        VARCHAR(8) NOT NULL,
    distrito        VARCHAR(20) NOT NULL,
    concelho        VARCHAR(20) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE armazem (
    id              NUMERIC PRIMARY KEY,
    localizacao     NUMERIC NOT NULL,
    --
    CONSTRAINT fk_armazem
        FOREIGN KEY (localizacao) REFERENCES localizacao(id)
) ENGINE = InnoDB;

CREATE TABLE lista_armazens (
    fornecedor      NUMERIC,
    armazem         NUMERIC,
    --
    CONSTRAINT pk_armazens
        PRIMARY KEY (fornecedor,armazem),
    CONSTRAINT fk_forn_id
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador),
    CONSTRAINT fk_armazem_id
        FOREIGN KEY (armazem) REFERENCES armazem(id)
) ENGINE = InnoDB;

CREATE TABLE transportador (
    utilizador      NUMERIC PRIMARY KEY,
    localizacao     NUMERIC,
    --
    CONSTRAINT fk_transportador
        FOREIGN KEY (utilizador) REFERENCES utilizador(id),
    CONSTRAINT fk_localizacao
        FOREIGN KEY (localizacao) REFERENCES localizacao(id)
) ENGINE = InnoDB;

CREATE TABLE veiculo (
    id              NUMERIC PRIMARY KEY,
    condicoes       VARCHAR(250) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE lista_veiculos (
    transportador   NUMERIC,
    veiculo         NUMERIC,
    --
    CONSTRAINT pk_veiculos
        PRIMARY KEY (transportador,veiculo),
    CONSTRAINT fk_transp_id
        FOREIGN KEY (transportador) REFERENCES transportador(utilizador),
    CONSTRAINT fk_veiculo_id
        FOREIGN KEY (veiculo) REFERENCES veiculo(id)
) ENGINE = InnoDB;

CREATE TABLE encomenda (
    id              NUMERIC PRIMARY KEY,
    data            DATE NOT NULL
) ENGINE = InnoDB;

CREATE TABLE estado_encomenda (
    encomenda       NUMERIC PRIMARY KEY,
    status_consum   BIT NOT NULL, -- 0 = false; 1 = true (para confirmar)
    status_fornec   BIT NOT NULL, -- 0 = false; 1 = true (para confirmar)
    status_transp   BIT NOT NULL, -- 0 = false; 1 = true (para confirmar)
    --
    CONSTRAINT fk_encomenda_status
        FOREIGN KEY (encomenda) REFERENCES encomenda(id)
) ENGINE = InnoDB;

CREATE TABLE lista_encomendas (
    consumidor      NUMERIC,
    encomenda       NUMERIC,
    fornecedor      NUMERIC,
    --
    CONSTRAINT pk_encomendas
        PRIMARY KEY (consumidor,encomenda,fornecedor),
    CONSTRAINT fk_consumidor_id
        FOREIGN KEY (consumidor) REFERENCES consumidor(utilizador),
    CONSTRAINT fk_encomenda_id
        FOREIGN KEY (encomenda) REFERENCES encomenda(id),
    CONSTRAINT fk_fornecedor_id
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador)
) ENGINE = InnoDB;

CREATE TABLE transportar_encomendas (
    encomenda       NUMERIC,
    transportador   NUMERIC,
    --
    CONSTRAINT pk_transportar_encomendas
        PRIMARY KEY (encomenda, transportador),
    CONSTRAINT fk_encomenda_ptransp
        FOREIGN KEY (encomenda) REFERENCES encomenda(id),
    CONSTRAINT fk_atransportar
        FOREIGN KEY (transportador) REFERENCES transportador(utilizador)
) ENGINE = InnoDB;

CREATE TABLE tipo_produto (
    id              NUMERIC PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE subtipo_produto (
    id              NUMERIC PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE tipo_subtipo (
    tipo            NUMERIC,
    subtipo         NUMERIC,
    --
    CONSTRAINT pk_tipo_subtipo
        PRIMARY KEY (tipo,subtipo),
    CONSTRAINT fk_tipo_lista
        FOREIGN KEY (tipo) REFERENCES tipo_produto(id),
    CONSTRAINT fk_subtipo_lista
        FOREIGN KEY (subtipo) REFERENCES subtipo_produto(id)
) ENGINE = InnoDB;

CREATE TABLE cadeia_logistica (
    id              NUMERIC PRIMARY KEY
) ENGINE = InnoDB;

CREATE TABLE produto (
    id              NUMERIC PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    fornecedor      NUMERIC NOT NULL,
    producao        DATE NOT NULL,
    preco           FLOAT NOT NULL,
    tipo            NUMERIC NOT NULL,
    subtipo         NUMERIC NOT NULL,
    cadeia_logis    NUMERIC NOT NULL, -- verificar... não fará mais sentido na cadeia logistica chamar-mos o produto?
    --
    CONSTRAINT fk_fornecedor_produto
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador),
    CONSTRAINT fk_tipo
        FOREIGN KEY (tipo) REFERENCES tipo_produto(id),
    CONSTRAINT fk_subtipo
        FOREIGN KEY (subtipo) REFERENCES subtipo_produto(id),
    CONSTRAINT fk_cadeia_produto
        FOREIGN KEY (cadeia_logis) REFERENCES cadeia_logistica(id)
) ENGINE = InnoDB;

CREATE TABLE cesto_compras (
    consumidor      NUMERIC,
    produto         NUMERIC,
    --
    CONSTRAINT pk_cesto_compras
        PRIMARY KEY (consumidor,produto),
    CONSTRAINT fk_cesto_consumidor
        FOREIGN KEY (consumidor) REFERENCES consumidor(utilizador),
    CONSTRAINT fk_cesto_produto
        FOREIGN KEY (produto) REFERENCES produto(id)
) ENGINE = InnoDB;

CREATE TABLE lista_produtos_encomenda (
    encomenda       NUMERIC,
    produto         NUMERIC,
    --
    CONSTRAINT pk_lista_produtos_encomenda
        PRIMARY KEY (encomenda,produto),
    CONSTRAINT fk_encomenda_cprodutos
        FOREIGN KEY (encomenda) REFERENCES encomenda(id),
    CONSTRAINT fk_produtos_encomenda
        FOREIGN KEY (produto) REFERENCES produto(id)
) ENGINE = InnoDB;

CREATE TABLE recurso (
    id              NUMERIC PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    un_medida       VARCHAR(25) NOT NULL,
    quantidade      FLOAT NOT NULL
) ENGINE = InnoDB;

CREATE TABLE lista_recursos (
    cadeia_logis    NUMERIC,
    recurso         NUMERIC,
    --
    CONSTRAINT pk_lista_recursos
        PRIMARY KEY (cadeia_logis,recurso),
    CONSTRAINT fk_cadeia_logis
        FOREIGN KEY (cadeia_logis) REFERENCES cadeia_logistica(id),
    CONSTRAINT fk_recurso
        FOREIGN KEY (recurso) REFERENCES recurso(id)
) ENGINE = InnoDB;

CREATE TABLE poluicao (
    id              NUMERIC PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE poluicao_cadeia (
    cadeia_logis    NUMERIC,
    poluicao        NUMERIC
    quantidade      FLOAT NOT NULL,
    --
    CONSTRAINT pk_poluicao_cadeia
        PRIMARY KEY (cadeia_logis,poluicao),
    CONSTRAINT fk_cadeia_logis_poluicao
        FOREIGN KEY (cadeia_logis) REFERENCES cadeia_logistica(id),
    CONSTRAINT fk_poluicao_cadeia
        FOREIGN KEY (poluicao)  REFERENCES poluicao(id)
) ENGINE = InnoDB;

CREATE TABLE emite_poluicao (
    veiculo         NUMERIC,
    poluicao        NUMERIC,
    quantidade      FLOAT,
    --
    CONSTRAINT pk_emite_poluicao
        PRIMARY KEY (veiculo,poluicao),
    CONSTRAINT fk_veiculo_polui
        FOREIGN KEY (veiculo) REFERENCES veiculo(id),
    CONSTRAINT fk_poluicao_emitida
        FOREIGN KEY (poluicao)  REFERENCES poluicao(id)
) ENGINE = InnoDB;