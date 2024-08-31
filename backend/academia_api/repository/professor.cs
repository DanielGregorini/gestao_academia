using Microsoft.EntityFrameworkCore;
using academia_api.data;
using academia_api.model;

namespace academia_api.repository
{
    public class ProfessorRepository : IRepository<Professor>
    {

        public async Task<Professor?> LoginProfessor(string login, string password)
        {
            using (var _context = new AcademiaContext())
            {
                var professor = await _context.Professores
                    .FirstOrDefaultAsync(e => e.Login == login && e.Senha == password);

                return professor;
            }
        }

        public async Task<Professor?> GetByIdAsync(int id)
        {
            using (var _context = new AcademiaContext())
            {
                return await _context.Set<Professor>().FindAsync(id);
            }
        }

        public async Task<IEnumerable<Professor>> GetAllAsync()
        {
            using (var _context = new AcademiaContext())
            {
                return await _context.Set<Professor>().ToListAsync();
            }
        }

        public async Task AddAsync(Professor e)
        {
            using (var _context = new AcademiaContext())
            {
                await _context.Set<Professor>().AddAsync(e);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateAsync(Professor e)
        {
            using (var _context = new AcademiaContext())
            {
                _context.Set<Professor>().Update(e);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveAsync(Professor e)
        {
            using (var _context = new AcademiaContext())
            {
                _context.Set<Professor>().Remove(e);
                await _context.SaveChangesAsync();
            }
        }
    }
}