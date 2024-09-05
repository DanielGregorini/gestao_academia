using academia_api.model;
using academia_api.repository;
using academia_api.services;

namespace academia_api.routes
{
    public static class ProfessorRoutes
    {
        public static void MapProfessorRoutes(this IEndpointRouteBuilder app)
        {

            app.MapPost("/professor/login", async (LoginRequest request) =>
            {
                if (request == null || string.IsNullOrWhiteSpace(request.Login) || string.IsNullOrWhiteSpace(request.Senha))
                {
                    return Results.BadRequest("Invalid login request");
                }

                var professorRepository = new ProfessorRepository();
                var professorLogin = await professorRepository.LoginProfessor(request.Login, request.Senha);

                if (professorLogin == null)
                {
                    return Results.Json(new { Message = "Invalid credentials" }, statusCode: 401);
                }

                var token = TokenService.GenerateTokenProfessor(professorLogin);

                professorLogin.Senha = null;
                
                return Results.Ok(new { 
                    Token = token,
                    Professor = professorLogin
                });
            });

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

                if(professor.Senha == null){
                    professor.Senha = existingProfessor.Senha;
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
