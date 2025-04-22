module.exports.roles = {
  admin: "admin",
  employee: "employee",
  client: "client",
};

module.exports.leadsIndustries = {
  financialServices: "Financial Services",
  retail: "Retail",
  healthcare: " Healthcare",
  softwareService: " Software and Services",
  manufacturing: " Manufacturing",
};

module.exports.leadStatus = {
  New: "New",
  Open: "Open",
  InProgress: "In Progress",
  Qualified: "Qualified",
  Unqualified: "Unqualified",
  Potential: "Potential",
  OpenDeal: "Open Deal",
  AttemptedtoContact: "Attempted to Contact",
  Connected: "Connected",
  MeetingSet: "Meeting Set",
  Working: "Working",
  Nurture: "Nurture",
  Customer: "Customer",
  OpportunityLost: "Opportunity Lost",
  InactiveCustomer: "Inactive Customer",
  BadTiming: "Bad Timing",
  NotInterested: "Not Interested",
  DoNotContact: "Do Not Contact",
  Deleted: "Deleted",
  Trial: "Trial",
  TrialExpired: "Trial Expired",
  Canceled: "Canceled",
  BadFit: "Bad Fit",
};

module.exports.permissions = [
  {
    name: "users",
    actions: ["create", "read", "update", "delete"],
  },
  {
    name: "products",
    actions: ["create", "read", "update", "delete"],
  },
  {
    name: "orders",
    actions: ["create", "read", "update", "delete"],
  },
];

module.exports.status = {
  active: "active",
  inactive: "inactive",
};

module.exports.paymentMethods = {
  paypal: "paypal",
  cash: "cash",
  bank: "bank",
};
