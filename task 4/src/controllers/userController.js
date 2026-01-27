let users = [
  { id: 1, name: "Alex", email: "alex@gmail.com" },
  {
    id: 2,
    name: "sarah",
    email: "sarah@gmail.com",
  },
];

export const getAllUsers = (req, res) => {
  res.json(users);
};
export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(user);
};
export const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id == id);
  if (!user) {
    req.status(404).json({ message: "user not found" });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
};
export const DeletUser = (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((u) => u.id !== id);
  res.json({ message: "user deleted succesfully" });
};
