module.exports.roles = ["admin", "employee", "client"];

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
