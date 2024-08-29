# Usar a imagem base do .NET SDK para build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# Copiar os arquivos .csproj e restaurar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar todos os arquivos e buildar o projeto
COPY . ./
RUN dotnet publish -c Release -o out

# Usar a imagem base do .NET runtime para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .

# Expor a porta que a aplicação irá usar
EXPOSE 5000

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "academia_api.dll"]
