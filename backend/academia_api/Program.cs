using academia_api.routes;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao contêiner.
// Configura o Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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

app.MapAlunoRoutes();
app.MapProfessorRoutes();
app.MapTreinoRoutes();

app.Run();