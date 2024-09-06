using academia_api.model;
using academia_api.repository;

namespace academia_api.routes
{
    public static class TreinoRoutes
    {
        public static void MapTreinoRoutes(this IEndpointRouteBuilder app)
        {
            app.MapGet("/treino", async () =>
            {
                var treinoRepository = new TreinoRepository();
                var treinos = await treinoRepository.GetAllAsync();
                return Results.Ok(treinos);
            });

            app.MapGet("/treino/{id:int}", async (int id) =>
            {
                var treinoRepository = new TreinoRepository();
                var treino = await treinoRepository.GetByIdAsync(id);
                return treino != null ? Results.Ok(treino) : Results.NotFound();
            });

            app.MapGet("/treino/aluno/{id:int}", async (int id) =>
            {
                var treinoRepository = new TreinoRepository();
                var treino = await treinoRepository.GetAllTreinoPorAlunoAsync(id);
                return treino != null ? Results.Ok(treino) : Results.NotFound();
            })
            .RequireAuthorization();

            app.MapPost("/treino", async (HttpRequest request) =>
            {
                var treino = await request.ReadFromJsonAsync<Treino>();

                if (treino == null)
                {
                    return Results.BadRequest("Dados do treino inválidos.");
                }

                var treinoRepository = new TreinoRepository();
                await treinoRepository.AddAsync(treino);

                return Results.Ok(treino);
            });

            app.MapPut("/treino/{id:int}", async (int id, HttpRequest request) =>
            {
                Console.WriteLine("oiiii   ", id);
                 Console.WriteLine("oiiii   ", id);
                var treino = await request.ReadFromJsonAsync<Treino>();

                if (treino == null)
                {
                    return Results.BadRequest("Dados do treino inválidos.");
                }

                var treinoRepository = new TreinoRepository();
                var existingTreino = await treinoRepository.GetByIdAsync(id);

                if (existingTreino == null)
                {
                    return Results.NotFound("Treino não encontrado.");
                }

                treino.IdTreino = id;
            
                await treinoRepository.UpdateAsync(treino);
                return Results.Ok(treino);
            });

            app.MapDelete("/treino/{id:int}", async (int id) =>
            {
                var treinoRepository = new TreinoRepository();
                var existingTreino = await treinoRepository.GetByIdAsync(id);

                if (existingTreino == null)
                {
                    return Results.NotFound();
                }

                await treinoRepository.RemoveAsync(existingTreino);
                return Results.NoContent();
            });
        }
    }
}