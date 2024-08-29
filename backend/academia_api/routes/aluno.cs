using academia_api.model;
using academia_api.repository;

namespace academia_api.routes
{
    public static class AlunoRoutes
    {
        public static void MapAlunoRoutes(this IEndpointRouteBuilder app)
        {
            // Rota para obter todos os alunos
            app.MapGet("/aluno", async () =>
            {
                var alunoRepository = new AlunoRepository();
                var alunos = await alunoRepository.GetAllAsync();
                return Results.Ok(alunos);
            });

            // Rota para obter um aluno específico pelo ID
            app.MapGet("/aluno/{id:int}", async (int id) =>
            {
                var alunoRepository = new AlunoRepository();
                var aluno = await alunoRepository.GetByIdAsync(id);
                return aluno != null ? Results.Ok(aluno) : Results.NotFound();
            });

            // Rota para criar um novo aluno
            app.MapPost("/aluno", async (HttpRequest request) =>
            {
                // Lê o JSON do corpo da requisição e desserializa para o objeto Aluno
                var aluno = await request.ReadFromJsonAsync<Aluno>();

                // Verifica se o objeto aluno foi desserializado corretamente
                if (aluno == null)
                {
                    return Results.BadRequest("Dados do aluno inválidos.");
                }

                var alunoRepository = new AlunoRepository();
                await alunoRepository.AddAsync(aluno);

                // Retorna o objeto Aluno com o ID atribuído
                return Results.Ok(aluno);
            });

            // Rota para atualizar um aluno existente pelo ID
            app.MapPut("/aluno/{id:int}", async (int id, HttpRequest request) =>
            {
                // Lê o JSON do corpo da requisição e desserializa para o objeto Aluno
                var aluno = await request.ReadFromJsonAsync<Aluno>();

                // Verifica se o objeto aluno foi desserializado corretamente
                if (aluno == null)
                {
                    return Results.BadRequest("Dados do aluno inválidos.");
                }

                var alunoRepository = new AlunoRepository();
                var existingAluno = await alunoRepository.GetByIdAsync(id);

                // Verifica se o aluno existe
                if (existingAluno == null)
                {
                    return Results.NotFound("Aluno não encontrado.");
                }

                // Atualiza o ID do aluno para garantir que estamos atualizando o aluno correto
                aluno.IdAluno = id;

                // Atualiza o aluno no repositório
                await alunoRepository.UpdateAsync(aluno);

                // Retorna o aluno atualizado
                return Results.Ok(aluno);
            });

            // Rota para deletar um aluno pelo ID
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