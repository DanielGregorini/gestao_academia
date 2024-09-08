# Etapa 1: Build da aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copiar o arquivo de projeto e restaurar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar todo o código e compilar a aplicação
COPY . ./
RUN dotnet publish "academia_api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Etapa 2: Execução da aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copiar os arquivos compilados da etapa de build
COPY --from=build-env /app/publish .

# Expor a porta 5000 no container
EXPOSE 5000

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "academia_api.dll"]
