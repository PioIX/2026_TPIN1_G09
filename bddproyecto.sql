-- Crear la base de datos
CREATE DATABASE higher_or_lower;
USE higher_or_lower;

-- ==========================
-- TABLA USUARIO
-- ==========================
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    mejor_puntaje INT DEFAULT 0
);

-- ==========================
-- TABLA JUGADOR_FUTBOL
-- ==========================
CREATE TABLE Jugador_Futbol (
    id_jugador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    equipo VARCHAR(100) NOT NULL,
    posicion VARCHAR(50) NOT NULL,
    valor_mercado BIGINT NOT NULL
);

-- ==========================
-- TABLA PARTIDA
-- ==========================
CREATE TABLE Partida (
    id_partida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    puntaje INT DEFAULT 0,
    vidas INT DEFAULT 3,
    ronda INT DEFAULT 1,

    FOREIGN KEY (id_usuario)
    REFERENCES Usuario(id_usuario)
);

-- ==========================
-- USUARIOS DE PRUEBA
-- ==========================
INSERT INTO Usuario (nombre, nombre_usuario, contrasena, mejor_puntaje)
VALUES
('Lorenzo Beccaria','lorenzo','1234',0),
('Franco Viggiano','franco','1234',0),
('Lucio Rosenthal','lucio','1234',0),
('Thiago Robles','thiago','1234',0);

-- ==========================
-- JUGADORES
-- ==========================
INSERT INTO Jugador_Futbol (nombre,equipo,posicion,valor_mercado)
VALUES
('Lionel Messi','Inter Miami','Delantero',18000000),
('Cristiano Ronaldo','Al Nassr','Delantero',12000000),
('Kylian Mbappe','Real Madrid','Delantero',170000000),
('Erling Haaland','Manchester City','Delantero',180000000),
('Vinicius Junior','Real Madrid','Delantero',170000000),
('Jude Bellingham','Real Madrid','Mediocampista',180000000),
('Lamine Yamal','Barcelona','Delantero',200000000),
('Pedri','Barcelona','Mediocampista',140000000),
('Rodri','Manchester City','Mediocampista',110000000),
('Bukayo Saka','Arsenal','Extremo',150000000),
('Florian Wirtz','Liverpool','Mediocampista',140000000),
('Jamal Musiala','Bayern Munich','Mediocampista',140000000),
('Cole Palmer','Chelsea','Mediocampista',120000000),
('Federico Valverde','Real Madrid','Mediocampista',130000000),
('Declan Rice','Arsenal','Mediocampista',120000000),
('Harry Kane','Bayern Munich','Delantero',90000000),
('Lautaro Martinez','Inter','Delantero',95000000),
('Alexis Mac Allister','Liverpool','Mediocampista',90000000),
('Julian Alvarez','Atletico Madrid','Delantero',100000000),
('Enzo Fernandez','Chelsea','Mediocampista',80000000);
('Michael Olise','Bayern Munich','Delantero',125000000)

-- ==========================
-- PARTIDAS DE PRUEBA
-- ==========================
INSERT INTO Partida (id_usuario,puntaje,vidas,ronda)
VALUES
(1,5,2,6),
(2,8,1,9);

-- ==========================
-- CONSULTAS
-- ==========================
SELECT * FROM Usuario;
SELECT * FROM Jugador_Futbol;
SELECT * FROM Partida;