using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;
using academia_api.routes;

var builder = WebApplication.CreateBuilder(args);

// Carregar as variáveis de ambiente do arquivo .env
Env.Load();

var secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");

// Se a chave não for encontrada, use uma chave padrão (apenas para desenvolvimento ou testes)
if (string.IsNullOrEmpty(secretKey))
{
    secretKey = "chave_aleatoria";  // Aviso: Use apenas para desenvolvimento ou testes!
}

// Criar a chave de assinatura usando a chave secreta
var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));


// Configurar o CORS para permitir requisições de qualquer origem
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Adicionar serviços ao contêiner
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.WebHost.UseUrls("http://0.0.0.0:5000");

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

// Configurar o pipeline de requisição HTTP
var app = builder.Build();

// Aplicar o middleware de CORS
app.UseCors("PermitirTudo");

app.UseAuthentication();
app.UseAuthorization();

// Configurar o pipeline de requisição HTTP para Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Minha API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.MapGet("/", () => "API está funcionando!");
// Mapear as rotas

app.MapAlunoRoutes();
app.MapProfessorRoutes();
app.MapTreinoRoutes();

app.Run();