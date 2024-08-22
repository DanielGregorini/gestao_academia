using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace academia_api.routes
{
    public static class AlunoRoutes
    {
        public static void MapAlunoRoutes(this IEndpointRouteBuilder app)
        {
            var alunos = new List<Aluno>();

            app.MapGet("/alunos", () =>
            {
                return Results.Ok(alunos);
            });

            // Outras rotas podem ser definidas aqui
        }
    }

    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
    }
}
