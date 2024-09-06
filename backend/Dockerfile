# Etapa 1: Construir o projeto
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 5298

# Copia o arquivo de solução e o arquivo do projeto
COPY *.sln ./
COPY academia_api/academia_api.csproj academia_api/

# Restaura as dependências
RUN dotnet restore academia_api/academia_api.csproj

# Copia o restante dos arquivos e compila o projeto
COPY . ./
WORKDIR /app/academia_api
RUN dotnet build -c Release -o /app/build

# Etapa 2: Publicar o projeto
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Etapa 3: Criar a imagem final
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copia os arquivos compilados
COPY --from=publish /app/publish .

# Define a porta que o container irá expor


# Comando para iniciar a aplicação
ENTRYPOINT ["dotnet", "academia_api.dll"]
