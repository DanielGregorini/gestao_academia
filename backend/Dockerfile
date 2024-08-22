# Etapa 1: Imagem base para a compilação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copie os arquivos do projeto e restaure as dependências
COPY *.csproj ./
RUN dotnet restore

# Copie o restante do código e compile a aplicação
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa 2: Imagem base para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# Expõe a porta que a aplicação vai rodar
EXPOSE 5100

# Defina o comando de entrada do contêiner para rodar a aplicação
ENTRYPOINT ["dotnet", "academia_api.dll"]
