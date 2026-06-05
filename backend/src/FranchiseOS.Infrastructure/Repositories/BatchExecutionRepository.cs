using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FranchiseOS.Infrastructure.Repositories;

public class BatchExecutionRepository : IBatchExecutionRepository
{
    private readonly ApplicationDbContext _context;

    public BatchExecutionRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> IsBatchAlreadyProcessedAsync(int month, int year)
    {
        return await _context.BatchExecutions.AnyAsync(b => b.ReferenceMonth == month && b.ReferenceYear == year && b.ExecutionStatus == "Success");
    }

    public async Task AddAsync(BatchExecution batchExecution)
    {
        _context.BatchExecutions.Add(batchExecution);
        await Task.CompletedTask;
    }
}