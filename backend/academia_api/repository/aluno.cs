using Microsoft.EntityFrameworkCore;
using academia_api.data;
using academia_api.model;

namespace academia_api.repository
{
    public class AlunoRepository : IRepository<Aluno>
    {
        public async Task<Aluno?> LoginAluno(string login, string password)
        {
            using (var _context = new AcademiaContext())
            {
                var aluno = await _context.Alunos
                    .FirstOrDefaultAsync(e => e.Login == login && e.Senha == password);

                return aluno;
            }
        }

        public async Task<Aluno?> GetByIdAsync(int id)
        {
            using (var _context = new AcademiaContext())
            {
                return await _context.Set<Aluno>().FindAsync(id);
            }
        }

        public async Task<IEnumerable<Aluno>> GetAllAsync()
        {
            using (var _context = new AcademiaContext())
            {
                return await _context.Set<Aluno>().ToListAsync();
            }
        }
        public async Task<IEnumerable<Aluno>> GetAllAlunoPorProfessorAsync(int idProfessor)
        {
            using (var _context = new AcademiaContext())
            {
                return await _context.Set<Aluno>()
                                        .Where(aluno => aluno.IdProfessor == idProfessor)
                                        .ToListAsync();
                }
        }

        public async Task AddAsync(Aluno e)
        {
            using (var _context = new AcademiaContext())
            {
                await _context.Set<Aluno>().AddAsync(e);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateAsync(Aluno e)
        {
            using (var _context = new AcademiaContext())
            {
                _context.Set<Aluno>().Update(e);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveAsync(Aluno e)
        {
            using (var _context = new AcademiaContext())
            {
                _context.Set<Aluno>().Remove(e);
                await _context.SaveChangesAsync();
            }
        }
    }
}
