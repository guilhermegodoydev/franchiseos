namespace backend.Entities;

public enum StatusEnum {
    Active = 1,
    Inactive = 2,
}

public enum SizeEnum {
    Kiosk = 1,
    StandardStore = 2,
    StreetStore = 3,
    Flagship = 4,
}

public enum TypeEnum {
    Own = 1,
    Franchise = 2
}

public enum UserRole { Owner }

public enum StatusRoyaltyEnum
{
    Pending = 1,
    Overdue = 2,
    Paid = 3,
    Cancelled = 4
}

public enum PayMethodEnum
{
    BankSlip = 1,
    Pix = 2,
    BankTransfer = 3,
    Other = 4
}
