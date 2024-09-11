# Projeto Academia - API

Este projeto é uma API desenvolvida com **.NET Core** e **Entity Framework Core** para gerenciar uma academia. O projeto usa **Docker** para facilitar a execução do ambiente de desenvolvimento, e o banco de dados pode ser configurado para rodar em memória ou com o **MySQL**.

## Pré-requisitos

- **.NET SDK**: [Instale o SDK](https://dotnet.microsoft.com/download)
- **Docker**: [Instale o Docker](https://www.docker.com/get-started)
- **MySQL** (opcional): Se desejar rodar com MySQL.

## Configuração do Banco de Dados

### Inserindo Dados na Tabela `tb_academia` (MySQL)

Caso você opte por utilizar o MySQL como banco de dados, após conectar ao MySQL com o usuário root, use o seguinte comando SQL para inserir um registro de exemplo:

INSERT INTO tb_academia (Nome, Cnpj, Endereco)
VALUES ('Academia Medianeira 1', '22.333.444/0001-55', 'Rua Exemplo, 123');

### Criar o Usuário para a Aplicação (MySQL)

Para criar um usuário específico para o projeto no MySQL, execute:

CREATE USER 'projeto'@'%' IDENTIFIED BY 'Projeto_academia@1';

## Rodando a Aplicação com Docker

Para rodar o projeto com Docker, execute o seguinte comando:

docker run -p 8080:5000 -e ASPNETCORE_ENVIRONMENT=Development --name dotnetapi1 dotnetapi1

Após isso, a API estará acessível em http://localhost:5000.

## Utilizando o Entity Framework Core

### Gerando Migrations

Caso precise criar uma migration para o banco de dados, execute o comando:

dotnet ef migrations add NOME_DA_MIGRATION

### Atualizando o Banco de Dados

Para aplicar as migrations e atualizar o banco de dados, execute:

dotnet ef database update

## Configuração para Banco de Dados InMemory

Se preferir rodar a aplicação com um banco de dados em memória, modifique o arquivo `data/AcademiaContext.cs` e deixe o método `OnConfiguring` como segue:

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseInMemoryDatabase("AcademiaDb");
}

## Executando a Aplicação

Para rodar a aplicação manualmente, sem Docker, execute os seguintes comandos no terminal:

dotnet run

Agora, abra http://localhost:5000 no navegador para acessar a aplicação.