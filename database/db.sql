CREATE DATABASE IF NOT EXISTS ecodb;
ALTER DATABASE ecodb CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ecodb;

CREATE TABLE distrito (
    id              INT PRIMARY KEY,
    nome            VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE concelho (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(50) NOT NULL,
    distrito        INT NOT NULL,
    --
    CONSTRAINT fk_concelho
        FOREIGN KEY (distrito) REFERENCES distrito(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE image (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    filename        VARCHAR(250) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE utilizador (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(50) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    nif             INT(9) NOT NULL UNIQUE,
    telemovel       INT(9) NOT NULL UNIQUE,
    image           INT,
    pass_word       VARCHAR(250) NOT NULL,
    morada          VARCHAR(250) NOT NULL,
    --
    CONSTRAINT fk_image
        FOREIGN KEY (image) REFERENCES image(id)
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
    distrito        INT NOT NULL,
    concelho        INT NOT NULL,
    --
    CONSTRAINT fk_dist
        FOREIGN KEY (distrito) REFERENCES distrito(id) ON DELETE CASCADE,
    CONSTRAINT fk_conc
        FOREIGN KEY (concelho) REFERENCES concelho(id) ON DELETE CASCADE
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
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador) ON DELETE CASCADE,
    CONSTRAINT fk_armazem_id
        FOREIGN KEY (armazem) REFERENCES armazem(id) ON DELETE CASCADE
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
    marca           VARCHAR(50),
    ano             INT(4),
    combustivel     INT(1), -- 1 -> Gasolina, 2 -> Gasóleo, 3 -> GPL, 4 -> Elétrico, 5 -> Híbrido
    caixa           INT(1), -- 1 -> Manual, 2 -> Automática
    co2             NUMERIC(3,2),
    --
    CONSTRAINT ck_comb
		CHECK (combustivel = 1 OR combustivel = 2 OR combustivel = 3 
			OR combustivel = 4 OR combustivel = 5),
    CONSTRAINT ck_caixa
		CHECK (caixa = 1 OR caixa = 2)
    
) ENGINE = InnoDB;

CREATE TABLE lista_veiculos (
    transportador   INT,
    veiculo         INT,
    --
    CONSTRAINT pk_veiculos
        PRIMARY KEY (transportador,veiculo),
    CONSTRAINT fk_transp_id
        FOREIGN KEY (transportador) REFERENCES transportador(utilizador) ON DELETE CASCADE,
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
        PRIMARY KEY (consumidor,encomenda),
    CONSTRAINT fk_consumidor_id
        FOREIGN KEY (consumidor) REFERENCES consumidor(utilizador) ON DELETE CASCADE,
    CONSTRAINT fk_encomenda_id
        FOREIGN KEY (encomenda) REFERENCES encomenda(id) ON DELETE CASCADE,
    CONSTRAINT fk_fornecedor_id
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador) ON DELETE CASCADE
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
    cadeia_logis    INT, 
    --
    CONSTRAINT pk_produto
        PRIMARY KEY (id, fornecedor),
    CONSTRAINT fk_fornecedor_produto
        FOREIGN KEY (fornecedor) REFERENCES fornecedor(utilizador)ON DELETE CASCADE,
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
    quantidade      INT NOT NULL,
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
        FOREIGN KEY (veiculo) REFERENCES veiculo(id) ON DELETE CASCADE,
    CONSTRAINT fk_poluicao_emitida
        FOREIGN KEY (poluicao)  REFERENCES poluicao(id)
) ENGINE = InnoDB;

INSERT INTO utilizador (nome, email, nif, telemovel, pass_word, morada) VALUES ('Admin','admin@ecomarket.pt', 000000000,000000000, 'adminOK', 'Administração');
INSERT INTO utilizador (nome, email, nif, telemovel, pass_word, morada) VALUES ('consumidor','cons1@ecomarket.pt', 111111111,111111111, 'consOK', 'Consumidor 1');
INSERT INTO utilizador (nome, email, nif, telemovel, pass_word, morada) VALUES ('fornecedor1','forn1@ecomarket.pt', 222222222,222222222, 'fornOK', 'Fornecedor 1');
INSERT INTO utilizador (nome, email, nif, telemovel, pass_word, morada) VALUES ('transportador1','trans1@ecomarket.pt', 333333333,333333333, 'transOK', 'Transportador 1');
SELECT id FROM utilizador WHERE email = 'cons1@ecomarket.pt';
SELECT id FROM utilizador WHERE email = 'forn1@ecomarket.pt';
SELECT id FROM utilizador WHERE email = 'trans1@ecomarket.pt';

INSERT INTO consumidor VALUES (2);
INSERT INTO fornecedor VALUES (3);
INSERT INTO transportador (utilizador) VALUES (4);

-- Inserts de Distritos e Concelhos
INSERT INTO distrito VALUES (1, 'Aveiro');
INSERT INTO distrito VALUES (2, 'Beja');	
INSERT INTO distrito VALUES (3, 'Braga');
INSERT INTO distrito VALUES (4, 'Bragança');
INSERT INTO distrito VALUES (5, 'Castelo Branco');
INSERT INTO distrito VALUES (6, 'Coimbra');	
INSERT INTO distrito VALUES (7, 'Évora');
INSERT INTO distrito VALUES (8, 'Faro');	
INSERT INTO distrito VALUES (9, 'Guarda');
INSERT INTO distrito VALUES (10, 'Leiria');
INSERT INTO distrito VALUES (11, 'Lisboa');
INSERT INTO distrito VALUES (12, 'Portalegre');	
INSERT INTO distrito VALUES (13, 'Porto');	
INSERT INTO distrito VALUES (14, 'Região Autónoma da Madeira');	
INSERT INTO distrito VALUES (15, 'Região Autónoma dos Açores');
INSERT INTO distrito VALUES (16, 'Santarém');
INSERT INTO distrito VALUES (17, 'Setúbal');
INSERT INTO distrito VALUES (18, 'Viana do Castelo');
INSERT INTO distrito VALUES (19, 'Vila Real');
INSERT INTO distrito VALUES (20, 'Viseu');

INSERT INTO concelho VALUES (101, 'Águeda', 1);
INSERT INTO concelho VALUES (102, 'Albergaria-a-Velha', 1);
INSERT INTO concelho VALUES (103, 'Anadia', 1);
INSERT INTO concelho VALUES (104, 'Aveiro', 1);
INSERT INTO concelho VALUES (105, 'Estarreja', 1);
INSERT INTO concelho VALUES (106, 'Ílhavo', 1);
INSERT INTO concelho VALUES (107, 'Murtosa', 1);
INSERT INTO concelho VALUES (108, 'Oliveira do Bairro', 1);
INSERT INTO concelho VALUES (109, 'Ovar', 1);
INSERT INTO concelho VALUES (110, 'Sever do Vouga', 1);
INSERT INTO concelho VALUES (111, 'Vagos', 1);

INSERT INTO concelho VALUES (201, 'Aljustrel', 2);
INSERT INTO concelho VALUES (202, 'Almodôvar', 2);
INSERT INTO concelho VALUES (203, 'Alvito', 2);
INSERT INTO concelho VALUES (204, 'Barrancos', 2);
INSERT INTO concelho VALUES (205, 'Beja', 2);
INSERT INTO concelho VALUES (206, 'Castro Verde', 2);
INSERT INTO concelho VALUES (207, 'Cuba', 2);
INSERT INTO concelho VALUES (208, 'Ferreira do Alentejo', 2);
INSERT INTO concelho VALUES (209, 'Mértola', 2);
INSERT INTO concelho VALUES (210, 'Moura', 2);
INSERT INTO concelho VALUES (211, 'Odemira', 2);
INSERT INTO concelho VALUES (212, 'Ourique', 2);
INSERT INTO concelho VALUES (213, 'Serpa', 2);
INSERT INTO concelho VALUES (214, 'Vidigueira', 2);

INSERT INTO concelho VALUES (301, 'Amares', 3);
INSERT INTO concelho VALUES (302, 'Barcelos', 3);
INSERT INTO concelho VALUES (303, 'Braga', 3);
INSERT INTO concelho VALUES (304, 'Cabeceiras de Basto', 3);
INSERT INTO concelho VALUES (305, 'Celorico de Basto', 3);
INSERT INTO concelho VALUES (306, 'Esposende', 3);
INSERT INTO concelho VALUES (307, 'Fafe', 3);
INSERT INTO concelho VALUES (308, 'Guimardes', 3);
INSERT INTO concelho VALUES (309, 'Povoa de Lanhoso', 3);
INSERT INTO concelho VALUES (310, 'Terras de Boura', 3);
INSERT INTO concelho VALUES (311, 'Vieira do Minho', 3);
INSERT INTO concelho VALUES (312, 'Vila Nova de Famalicão', 3);
INSERT INTO concelho VALUES (313, 'Vila Verde', 3);
INSERT INTO concelho VALUES (314, 'Vizela', 3);

INSERT INTO concelho VALUES (401, 'Alfândega da Fé', 4);
INSERT INTO concelho VALUES (402, 'Bragança', 4);
INSERT INTO concelho VALUES (403, 'Carrazeda de Ansiães', 4);
INSERT INTO concelho VALUES (404, 'Freixo de Espada à Cinta', 4);
INSERT INTO concelho VALUES (405, 'Macedo de Cavaleiros', 4);
INSERT INTO concelho VALUES (406, 'Miranda do Douro', 4);
INSERT INTO concelho VALUES (407, 'Mirandela', 4);
INSERT INTO concelho VALUES (408, 'Mogadouro', 4);
INSERT INTO concelho VALUES (409, 'Torre de Moncorvo', 4);
INSERT INTO concelho VALUES (410, 'Vimioso', 4);
INSERT INTO concelho VALUES (411, 'Vila Flor', 4);
INSERT INTO concelho VALUES (412, 'Vinhais', 4);

INSERT INTO concelho VALUES (501, 'Belmonte', 5);
INSERT INTO concelho VALUES (502, 'Castelo Branco', 5);
INSERT INTO concelho VALUES (503, 'Covilhã', 5);
INSERT INTO concelho VALUES (504, 'Fundão', 5);
INSERT INTO concelho VALUES (505, 'Idanha-a-Nova', 5);
INSERT INTO concelho VALUES (506, 'Oleiros', 5);
INSERT INTO concelho VALUES (507, 'Penamacor', 5);
INSERT INTO concelho VALUES (508, 'Proença-a-Nova', 5);
INSERT INTO concelho VALUES (509, 'Sertã', 5);
INSERT INTO concelho VALUES (510, 'Vila de Rei', 5);
INSERT INTO concelho VALUES (511, 'Vila Velha de Ródão', 5);

INSERT INTO concelho VALUES (601, 'Arganil', 6);
INSERT INTO concelho VALUES (602, 'Cantanhede', 6);
INSERT INTO concelho VALUES (603, 'Coimbra', 6);
INSERT INTO concelho VALUES (604, 'Condeixa-a-Nova', 6);
INSERT INTO concelho VALUES (605, 'Figueira da Foz', 6);
INSERT INTO concelho VALUES (606, 'Góis', 6);
INSERT INTO concelho VALUES (607, 'Lousã', 6);
INSERT INTO concelho VALUES (608, 'Mira', 6);
INSERT INTO concelho VALUES (609, 'Miranda do Corvo', 6);
INSERT INTO concelho VALUES (610, 'Montemor-o-Velho', 6);
INSERT INTO concelho VALUES (611, 'Oliveira do Hospital', 6);
INSERT INTO concelho VALUES (612, 'Pampilhosa da Serra', 6);
INSERT INTO concelho VALUES (613, 'Penacova', 6);
INSERT INTO concelho VALUES (614, 'Penela', 6);
INSERT INTO concelho VALUES (615, 'Soure', 6);
INSERT INTO concelho VALUES (616, 'Tábua', 6);
INSERT INTO concelho VALUES (617, 'Vila Nova de Poiares', 6);

INSERT INTO concelho VALUES (701, 'Alandroal', 7);
INSERT INTO concelho VALUES (702, 'Arraiolos', 7);
INSERT INTO concelho VALUES (703, 'Borba', 7);
INSERT INTO concelho VALUES (704, 'Estremoz', 7);
INSERT INTO concelho VALUES (705, 'Évora', 7);
INSERT INTO concelho VALUES (706, 'Montemor-o-Novo', 7);
INSERT INTO concelho VALUES (707, 'Mora', 7);
INSERT INTO concelho VALUES (708, 'Mourão', 7);
INSERT INTO concelho VALUES (709, 'Portel', 7);
INSERT INTO concelho VALUES (710, 'Redondo', 7);
INSERT INTO concelho VALUES (711, 'Reguengos de Monsaraz', 7);
INSERT INTO concelho VALUES (712, 'Vendas Novas', 7);
INSERT INTO concelho VALUES (713, 'Viana do Alentejo', 7);
INSERT INTO concelho VALUES (714, 'Vila Viçosa', 7);

INSERT INTO concelho VALUES (801, 'Albufeira', 8);
INSERT INTO concelho VALUES (802, 'Alcoutim', 8);
INSERT INTO concelho VALUES (803, 'Aljezur', 8);
INSERT INTO concelho VALUES (804, 'Castro Marim', 8);
INSERT INTO concelho VALUES (805, 'Faro', 8);
INSERT INTO concelho VALUES (806, 'Lagoa', 8);
INSERT INTO concelho VALUES (807, 'Lagos', 8);
INSERT INTO concelho VALUES (808, 'Loulé', 8);
INSERT INTO concelho VALUES (809, 'Monchique', 8);
INSERT INTO concelho VALUES (810, 'Olhão', 8);
INSERT INTO concelho VALUES (811, 'Portimão', 8);
INSERT INTO concelho VALUES (812, 'São Brás de Alportel', 8);
INSERT INTO concelho VALUES (813, 'Silves', 8);
INSERT INTO concelho VALUES (814, 'Tavira', 8);
INSERT INTO concelho VALUES (815, 'Vila do Bispo', 8);
INSERT INTO concelho VALUES (816, 'Vila Real de Santo António', 8);

INSERT INTO concelho VALUES (901, 'Almeida', 9);
INSERT INTO concelho VALUES (902, 'Aguiar da Beira', 9);
INSERT INTO concelho VALUES (903, 'Celorico da Beira', 9);
INSERT INTO concelho VALUES (904, 'Figueira de Castelo Rodrigo', 9);
INSERT INTO concelho VALUES (905, 'Fornos de Algodres', 9);
INSERT INTO concelho VALUES (906, 'Guarda', 9);
INSERT INTO concelho VALUES (907, 'Gouveia', 9);
INSERT INTO concelho VALUES (908, 'Manteigas', 9);
INSERT INTO concelho VALUES (909, 'Mêda', 9);
INSERT INTO concelho VALUES (910, 'Pinhel', 9);
INSERT INTO concelho VALUES (911, 'Seia', 9);
INSERT INTO concelho VALUES (912, 'Sabugal', 9);
INSERT INTO concelho VALUES (913, 'Trancoso', 9);
INSERT INTO concelho VALUES (914, 'Vila Nova de Foz Coa', 9);

INSERT INTO concelho VALUES (1001, 'Alcobaça', 10);
INSERT INTO concelho VALUES (1002, 'Alvaiázere', 10);
INSERT INTO concelho VALUES (1003, 'Ansião', 10);
INSERT INTO concelho VALUES (1004, 'Batalha', 10);
INSERT INTO concelho VALUES (1005, 'Bombarral', 10);
INSERT INTO concelho VALUES (1006, 'Caldas da Rainha', 10);
INSERT INTO concelho VALUES (1007, 'Castanheira de Pera', 10);
INSERT INTO concelho VALUES (1008, 'Figueiró dos Vinhos', 10);
INSERT INTO concelho VALUES (1009, 'Leiria', 10);
INSERT INTO concelho VALUES (1010, 'Marinha Grande', 10);
INSERT INTO concelho VALUES (1011, 'Nazaré', 10);
INSERT INTO concelho VALUES (1012, 'Óbidos', 10);
INSERT INTO concelho VALUES (1013, 'Pedrógão Grande', 10);
INSERT INTO concelho VALUES (1014, 'Peniche', 10);
INSERT INTO concelho VALUES (1015, 'Pombal', 10);
INSERT INTO concelho VALUES (1016, 'Porto de Mós', 10);

INSERT INTO concelho VALUES (1101, 'Alenquer', 11);
INSERT INTO concelho VALUES (1102, 'Amadora', 11);
INSERT INTO concelho VALUES (1103, 'Arruda dos Vinhos', 11);
INSERT INTO concelho VALUES (1104, 'Azambuja', 11);
INSERT INTO concelho VALUES (1105, 'Cadaval', 11);
INSERT INTO concelho VALUES (1106, 'Cascais', 11);
INSERT INTO concelho VALUES (1107, 'Lisboa', 11);
INSERT INTO concelho VALUES (1108, 'Loures', 11);
INSERT INTO concelho VALUES (1109, 'Lourinhã', 11);
INSERT INTO concelho VALUES (1110, 'Mafra', 11);
INSERT INTO concelho VALUES (1111, 'Odivelas', 11);
INSERT INTO concelho VALUES (1112, 'Oeiras', 11);
INSERT INTO concelho VALUES (1113, 'Sintra', 11);
INSERT INTO concelho VALUES (1114, 'Sobral de Monte Agraço', 11);
INSERT INTO concelho VALUES (1115, 'Torres Vedras', 11);
INSERT INTO concelho VALUES (1116, 'Vila Franca de Xira', 11);

INSERT INTO concelho VALUES (1201, 'Alter do Chão', 12);
INSERT INTO concelho VALUES (1202, 'Arronches', 12);
INSERT INTO concelho VALUES (1203, 'Avis', 12);
INSERT INTO concelho VALUES (1204, 'Campo Maior', 12);
INSERT INTO concelho VALUES (1205, 'Castelo de Vide', 12);
INSERT INTO concelho VALUES (1206, 'Crato', 12);
INSERT INTO concelho VALUES (1207, 'Elvas', 12);
INSERT INTO concelho VALUES (1208, 'Fronteira', 12);
INSERT INTO concelho VALUES (1209, 'Gavião', 12);
INSERT INTO concelho VALUES (1210, 'Marvão', 12);
INSERT INTO concelho VALUES (1211, 'Monforte', 12);
INSERT INTO concelho VALUES (1212, 'Nisa', 12);
INSERT INTO concelho VALUES (1213, 'Ponte de Sor', 12);
INSERT INTO concelho VALUES (1214, 'Portalegre', 12);
INSERT INTO concelho VALUES (1215, 'Sousel', 12);

INSERT INTO concelho VALUES (1301, 'Amarante', 13);
INSERT INTO concelho VALUES (1302, 'Baião', 13);
INSERT INTO concelho VALUES (1303, 'Felgueiras', 13);
INSERT INTO concelho VALUES (1304, 'Gondomar', 13);
INSERT INTO concelho VALUES (1305, 'Lousada', 13);
INSERT INTO concelho VALUES (1306, 'Maia', 13);
INSERT INTO concelho VALUES (1307, 'Matosinhos', 13);
INSERT INTO concelho VALUES (1308, 'Marco de Canaveses', 13);
INSERT INTO concelho VALUES (1309, 'Paços de Ferreira', 13);
INSERT INTO concelho VALUES (1310, 'Paredes', 13);
INSERT INTO concelho VALUES (1311, 'Penafiel', 13);
INSERT INTO concelho VALUES (1312, 'Porto', 13);
INSERT INTO concelho VALUES (1313, 'Póvoa de Varzim', 13);
INSERT INTO concelho VALUES (1314, 'Santo Tirso', 13);
INSERT INTO concelho VALUES (1315, 'Trofa', 13);
INSERT INTO concelho VALUES (1316, 'Valongo', 13);
INSERT INTO concelho VALUES (1317, 'Vila do Conde', 13);
INSERT INTO concelho VALUES (1318, 'Vila Nova de Gaia', 13);

INSERT INTO concelho VALUES (1401, 'Calheta (Madeira)', 14);
INSERT INTO concelho VALUES (1402, 'Câmara de Lobos (Madeira)', 14);
INSERT INTO concelho VALUES (1403, 'Funchal (Madeira)', 14);
INSERT INTO concelho VALUES (1404, 'Machico (Madeira)', 14);
INSERT INTO concelho VALUES (1405, 'Ponta do Sol (Madeira)', 14);
INSERT INTO concelho VALUES (1406, 'Porto Moniz (Madeira)', 14);
INSERT INTO concelho VALUES (1407, 'Porto Santo (Porto Santo)', 14);
INSERT INTO concelho VALUES (1408, 'Ribeira Brava (Madeira)', 14);
INSERT INTO concelho VALUES (1409, 'Santa Cruz (Madeira)', 14);
INSERT INTO concelho VALUES (1410, 'Santana (Madeira)', 14);
INSERT INTO concelho VALUES (1411, 'São Vicente (Madeira)', 14);

INSERT INTO concelho VALUES (1501, 'Vila do Porto (Santa Maria)', 15);
INSERT INTO concelho VALUES (1502, 'Lagoa (São Miguel)', 15);
INSERT INTO concelho VALUES (1503, 'Nordeste (São Miguel)', 15);
INSERT INTO concelho VALUES (1504, 'Ponta Delgada (São Miguel)', 15);
INSERT INTO concelho VALUES (1505, 'Vila da Povoação (São Miguel)', 15);
INSERT INTO concelho VALUES (1506, 'Ribeira Grande (São Miguel)', 15);
INSERT INTO concelho VALUES (1507, 'Vila Franca do Campo (São Miguel)', 15);
INSERT INTO concelho VALUES (1508, 'Angra do Heroísmo (Terceira)', 15);
INSERT INTO concelho VALUES (1509, 'Praia da Vitória (Terceira)', 15);
INSERT INTO concelho VALUES (1510, 'Santa Cruz da Graciosa (Graciosa)', 15);
INSERT INTO concelho VALUES (1511, 'Calheta de São Jorge (São Jorge)', 15);
INSERT INTO concelho VALUES (1512, 'Velas (São Jorge)', 15);
INSERT INTO concelho VALUES (1513, 'Lajes do Pico (Pico)', 15);
INSERT INTO concelho VALUES (1514, 'Madalena (Pico)', 15);
INSERT INTO concelho VALUES (1515, 'São Roque do Pico  (Pico)', 15);
INSERT INTO concelho VALUES (1516, 'Horta (Faial)', 15);
INSERT INTO concelho VALUES (1517, 'Lajes das Floress (Flores)', 15);
INSERT INTO concelho VALUES (1518, 'Santa Cruz das Flores (Flores)', 15);
INSERT INTO concelho VALUES (1519, 'Vila do Corvo (Corvo)', 15);

INSERT INTO concelho VALUES (1601, 'Abrantes', 16);
INSERT INTO concelho VALUES (1602, 'Alcanena', 16);
INSERT INTO concelho VALUES (1603, 'Almeirim', 16);
INSERT INTO concelho VALUES (1604, 'Alpiarça', 16);
INSERT INTO concelho VALUES (1605, 'Benavente', 16);
INSERT INTO concelho VALUES (1606, 'Cartaxo', 16);
INSERT INTO concelho VALUES (1607, 'Chamusca', 16);
INSERT INTO concelho VALUES (1608, 'Constância', 16);
INSERT INTO concelho VALUES (1609, 'Coruche', 16);
INSERT INTO concelho VALUES (1610, 'Entroncamento', 16);
INSERT INTO concelho VALUES (1611, 'Ferreira do Zêzere', 16);
INSERT INTO concelho VALUES (1612, 'Golegã', 16);
INSERT INTO concelho VALUES (1613, 'Mação', 16);
INSERT INTO concelho VALUES (1614, 'Ourém', 16);
INSERT INTO concelho VALUES (1615, 'Rio Maior', 16);
INSERT INTO concelho VALUES (1616, 'Salvaterra de Magos', 16);
INSERT INTO concelho VALUES (1617, 'Sardoal', 16);
INSERT INTO concelho VALUES (1618, 'Santarém', 16);
INSERT INTO concelho VALUES (1619, 'Tomar', 16);
INSERT INTO concelho VALUES (1620, 'Torres Novas', 16);
INSERT INTO concelho VALUES (1621, 'Vila Nova da Barquinha', 16);

INSERT INTO concelho VALUES (1701, 'Alcácer do Sal', 17);
INSERT INTO concelho VALUES (1702, 'Alcochete', 17);
INSERT INTO concelho VALUES (1703, 'Almada', 17);
INSERT INTO concelho VALUES (1704, 'Barreiro', 17);
INSERT INTO concelho VALUES (1705, 'Grândola', 17);
INSERT INTO concelho VALUES (1706, 'Moita', 17);
INSERT INTO concelho VALUES (1707, 'Montijo', 17);
INSERT INTO concelho VALUES (1708, 'Palmela', 17);
INSERT INTO concelho VALUES (1709, 'Santiago do Cacém', 17);
INSERT INTO concelho VALUES (1710, 'Seixal', 17);
INSERT INTO concelho VALUES (1711, 'Sesimbra', 17);
INSERT INTO concelho VALUES (1712, 'Setúbal', 17);
INSERT INTO concelho VALUES (1713, 'Sines', 17);

INSERT INTO concelho VALUES (1801, 'Arcos de Valdevez', 18);
INSERT INTO concelho VALUES (1802, 'Caminha', 18);
INSERT INTO concelho VALUES (1803, 'Melgaço', 18);
INSERT INTO concelho VALUES (1804, 'Monção', 18);
INSERT INTO concelho VALUES (1805, 'Paredes de Coura', 18);
INSERT INTO concelho VALUES (1806, 'Ponte da Barca', 18);
INSERT INTO concelho VALUES (1807, 'Ponte de Lima', 18);
INSERT INTO concelho VALUES (1808, 'Valença', 18);
INSERT INTO concelho VALUES (1809, 'Viana do Castelo', 18);
INSERT INTO concelho VALUES (1810, 'Vila Nova de Cerveira', 18);

INSERT INTO concelho VALUES (1901, 'Alijó', 19);
INSERT INTO concelho VALUES (1902, 'Boticas', 19);
INSERT INTO concelho VALUES (1903, 'Chaves', 19);
INSERT INTO concelho VALUES (1904, 'Mesão Frio', 19);
INSERT INTO concelho VALUES (1905, 'Mondim de Basto', 19);
INSERT INTO concelho VALUES (1906, 'Montalegre', 19);
INSERT INTO concelho VALUES (1907, 'Murça', 19);
INSERT INTO concelho VALUES (1908, 'Peso da Régua', 19);
INSERT INTO concelho VALUES (1909, 'Ribeira de Pena', 19);
INSERT INTO concelho VALUES (1910, 'Sabrosa', 19);
INSERT INTO concelho VALUES (1911, 'Santa Marta de Penaguião', 19);
INSERT INTO concelho VALUES (1912, 'Valpaços', 19);
INSERT INTO concelho VALUES (1913, 'Vila Pouca de Aguiar', 19);
INSERT INTO concelho VALUES (1914, 'Vila Real', 19);

INSERT INTO concelho VALUES (2001, 'Armamar', 20);
INSERT INTO concelho VALUES (2002, 'Carregal do Sal', 20);
INSERT INTO concelho VALUES (2003, 'Castro Daire', 20);
INSERT INTO concelho VALUES (2004, 'Cinfães', 20);
INSERT INTO concelho VALUES (2005, 'Lamego', 20);
INSERT INTO concelho VALUES (2006, 'Mangualde', 20);
INSERT INTO concelho VALUES (2007, 'Moimenta da Beira', 20);
INSERT INTO concelho VALUES (2008, 'Mortágua', 20);
INSERT INTO concelho VALUES (2009, 'Nelas', 20);
INSERT INTO concelho VALUES (2010, 'Oliveira de Frades', 20);
INSERT INTO concelho VALUES (2011, 'Penalva do Castelo', 20);
INSERT INTO concelho VALUES (2012, 'Penedono', 20);
INSERT INTO concelho VALUES (2013, 'Resende', 20);
INSERT INTO concelho VALUES (2014, 'Santa Comba Dão', 20);
INSERT INTO concelho VALUES (2015, 'São João da Pesqueira', 20);
INSERT INTO concelho VALUES (2016, 'São Pedro do Sul', 20);
INSERT INTO concelho VALUES (2017, 'Sátão', 20);
INSERT INTO concelho VALUES (2018, 'Sernancelhe', 20);
INSERT INTO concelho VALUES (2019, 'Tabuaço', 20);
INSERT INTO concelho VALUES (2020, 'Tarouca', 20);
INSERT INTO concelho VALUES (2021, 'Tondela', 20);
INSERT INTO concelho VALUES (2022, 'Vila Nova de Paiva', 20);
INSERT INTO concelho VALUES (2023, 'Viseu', 20);
INSERT INTO concelho VALUES (2024, 'Vouzela', 20);

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