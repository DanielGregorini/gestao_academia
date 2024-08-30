using Microsoft.EntityFrameworkCore;
using academia_api.data;
using academia_api.model;

namespace academia_api.repository
{
    public class TreinoRepository : IRepository<Treino>
    {
        public async Task<Treino?> GetByIdAsync(int id)
        {
            using (var _context = new AcademiaContext())
            {
                return await _context.Set<Treino>().FindAsync(id);
            }
        }

        public async Task<IEnumerable<Treino>> GetAllAsync()
        {
            using (var _context = new AcademiaContext())
            {
                return await _context.Set<Treino>().ToListAsync();
            }
        }

        public async Task<IEnumerable<Treino>> GetAllTreinoPorAlunoAsync(int idAluno)
        {
            using (var _context = new AcademiaContext())
            {
                // Filtra os treinos pelo idAluno fornecido
                return await _context.Set<Treino>()
                                    .Where(treino => treino.IdAluno == idAluno)
                                    .ToListAsync();
            }
        }

        public async Task AddAsync(Treino e)
        {
            using (var _context = new AcademiaContext())
            {
                await _context.Set<Treino>().AddAsync(e);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateAsync(Treino e)
        {
            using (var _context = new AcademiaContext())
            {
                _context.Set<Treino>().Update(e);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveAsync(Treino e)
        {
            using (var _context = new AcademiaContext())
            {
                _context.Set<Treino>().Remove(e);
                await _context.SaveChangesAsync();
            }
        }
    }
}
