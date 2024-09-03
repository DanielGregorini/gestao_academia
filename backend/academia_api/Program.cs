using academia_api.routes;
using academia_api.services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Carrega as variáveis de ambiente do arquivo .env
Env.Load();

var secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");

// Se a chave não for encontrada, use uma chave padrão (apenas para desenvolvimento ou testes)
if (string.IsNullOrEmpty(secretKey))
{
    secretKey = "chave_aleatoria"; // Aviso: Use apenas para desenvolvimento ou testes!
}

// Crie a chave de assinatura usando a chave secreta
var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

// Adiciona serviços ao contêiner.
// Configura o Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração da autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = signingKey,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication(); // Certifique-se de que a autenticação está configurada no pipeline
app.UseAuthorization(); 

// Configura o pipeline de requisição HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Minha API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

app.MapGet("/", () =>
{
    string return_api = "API na escuta!!!";
    return return_api;
})
.WithName("/")
.WithOpenApi();

//mapeando as rotas
app.MapAlunoRoutes();
app.MapProfessorRoutes();
app.MapTreinoRoutes();

app.Run();