using FranchiseOS.Domain.Entities;

namespace FranchiseOS.Domain.Interfaces;

public interface IBatchExecutionRepository
{
    Task<bool> IsBatchAlreadyProcessedAsync(int month, int year);
    Task AddAsync(BatchExecution batchExecution);
}