# Etapa única: Executar a aplicação em modo de desenvolvimento
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev-env
WORKDIR /app

# Copiar o arquivo de projeto e restaurar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar todo o código fonte
COPY . ./

# Expor a porta 5000 no container
EXPOSE 5000

# Comando para rodar a aplicação em modo de desenvolvimento
ENTRYPOINT ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5000"]