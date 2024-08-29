using academia_api.model;
using academia_api.repository;

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

}
