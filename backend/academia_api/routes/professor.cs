using academia_api.model;
using academia_api.repository;

namespace academia_api.routes
{
    public static class ProfessorRoutes
    {
        public static void MapProfessorRoutes(this IEndpointRouteBuilder app)
        {
            app.MapGet("/professor", async () =>
            {
                var professorRepository = new ProfessorRepository();
                var professores = await professorRepository.GetAllAsync();
                return Results.Ok(professores);
            });

            app.MapGet("/professor/{id:int}", async (int id) =>
            {
                var professorRepository = new ProfessorRepository();
                var professor = await professorRepository.GetByIdAsync(id);
                return professor != null ? Results.Ok(professor) : Results.NotFound();
            });

            app.MapPost("/professor", async (HttpRequest request) =>
            {
                var professor = await request.ReadFromJsonAsync<Professor>();

                if (professor == null)
                {
                    return Results.BadRequest("Dados do professor inválidos.");
                }

                var professorRepository = new ProfessorRepository();
                await professorRepository.AddAsync(professor);

                return Results.Ok(professor);
            });

            app.MapPut("/professor/{id:int}", async (int id, HttpRequest request) =>
            {
                var professor = await request.ReadFromJsonAsync<Professor>();

                if (professor == null)
                {
                    return Results.BadRequest("Dados do professor inválidos.");
                }

                var professorRepository = new ProfessorRepository();
                var existingProfessor = await professorRepository.GetByIdAsync(id);

                if (existingProfessor == null)
                {
                    return Results.NotFound("Professor não encontrado.");
                }

                professor.IdProfessor = id;
                await professorRepository.UpdateAsync(professor);
                return Results.Ok(professor);
            });

            app.MapDelete("/professor/{id:int}", async (int id) =>
            {
                var professorRepository = new ProfessorRepository();
                var existingProfessor = await professorRepository.GetByIdAsync(id);

                if (existingProfessor == null)
                {
                    return Results.NotFound();
                }

                await professorRepository.RemoveAsync(existingProfessor);
                return Results.NoContent();
            });
        }
    }
}
