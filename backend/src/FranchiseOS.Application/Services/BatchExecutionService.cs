using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Exceptions;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Application.Services;

public class BatchExecutionService
{
    private readonly IRoyaltyBillingRepository _royaltyRepo;
    private readonly IBatchExecutionRepository _batchRepo;
    private readonly IMonthlyRevenueRepository _revenueRepo;
    private readonly IUnitOfWork _unitOfWork;

    public BatchExecutionService(IRoyaltyBillingRepository royaltyRepo, IBatchExecutionRepository batchRepo, IMonthlyRevenueRepository revenueRepo, IUnitOfWork unitOfWork)
    {
        _batchRepo = batchRepo;
        _royaltyRepo = royaltyRepo;
        _revenueRepo = revenueRepo;
        _unitOfWork = unitOfWork;
    }

    public async Task ProcessMonthlyBillingAsync(Guid mainOfficeId, int month, int year)
    {
        var alreadyProcessed = await _batchRepo.IsBatchAlreadyProcessedAsync(month, year);
        if (alreadyProcessed) throw BatchException.AlreadyProcessed();

        var revenues = await _revenueRepo.GetAllByMonthAndOffice(mainOfficeId, month, year);

        if (!revenues.Any()) throw MonthlyRevException.NoRevenuesDeclared();
        
        var royaltyBillings = revenues.Select(r =>
        {
            decimal amount = r.Revenue * (r.Unit.RoyaltiesPercentage / 100);
            return new RoyaltyBilling(r.Id, amount, r.Unit.RoyaltiesPercentage);
        }).ToList();

        var batchExecution = new BatchExecution(
            month, 
            year, 
            totalInvoices: royaltyBillings.Count, 
            totalAmount: royaltyBillings.Sum(b => b.CalculatedAmount),
            exStatus: "Success",
            actionLogs: $"Processed billing for {royaltyBillings.Count} active units successfully."
        );
        
        await _batchRepo.AddAsync(batchExecution);
        await _royaltyRepo.AddRangeAsync(royaltyBillings);

        await _unitOfWork.CommitAsync();
    }
}