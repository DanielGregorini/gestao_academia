using academia_api.model;
using academia_api.repository;

namespace academia_api.routes
{
    public static class AlunoRoutes
    {
        public static void MapAlunoRoutes(this IEndpointRouteBuilder app)
        {
            app.MapGet("/aluno", async () =>
            {
                var alunoRepository = new AlunoRepository();
                var alunos = await alunoRepository.GetAllAsync();
                return Results.Ok(alunos);
            });

            app.MapGet("/aluno/{id:int}", async (int id) =>
            {
                var alunoRepository = new AlunoRepository();
                var aluno = await alunoRepository.GetByIdAsync(id);
                return aluno != null ? Results.Ok(aluno) : Results.NotFound();
            });

            app.MapGet("/aluno/professor{id:int}", async (int id) =>
            {
                var alunoRepository = new AlunoRepository();
                var aluno = await alunoRepository.GetByIdAsync(id);
                return aluno != null ? Results.Ok(aluno) : Results.NotFound();
            });

            app.MapPost("/aluno", async (HttpRequest request) =>
            {
                var aluno = await request.ReadFromJsonAsync<Aluno>();

                // Verifica se o objeto aluno foi desserializado corretamente
                if (aluno == null)
                {
                    return Results.BadRequest("Dados do aluno inválidos.");
                }

                var alunoRepository = new AlunoRepository();
                await alunoRepository.AddAsync(aluno);

                return Results.Ok(aluno);
            });

            app.MapPut("/aluno/{id:int}", async (int id, HttpRequest request) =>
            {
                var aluno = await request.ReadFromJsonAsync<Aluno>();

                if (aluno == null)
                {
                    return Results.BadRequest("Dados do aluno inválidos.");
                }

                var alunoRepository = new AlunoRepository();
                var existingAluno = await alunoRepository.GetByIdAsync(id);

                if (existingAluno == null)
                {
                    return Results.NotFound("Aluno não encontrado.");
                }

                aluno.IdAluno = id;

                await alunoRepository.UpdateAsync(aluno);

                return Results.Ok(aluno);
            });

            app.MapDelete("/aluno/{id:int}", async (int id) =>
            {
                var alunoRepository = new AlunoRepository();
                var existingAluno = await alunoRepository.GetByIdAsync(id);

                if (existingAluno == null)
                {
                    return Results.NotFound();
                }

                await alunoRepository.RemoveAsync(existingAluno);
                return Results.NoContent();
            });
        }
    }
}