module.exports.roles = {
  admin: "admin",
  employee: "employee",
  client: "client",
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
