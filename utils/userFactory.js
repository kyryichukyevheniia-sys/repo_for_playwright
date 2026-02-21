function generateUser() {
  const timestamp = Date.now();

  return {
    name: "John",
    lastName: "Smith",
    email: `aqa-${timestamp}@test.com`,
    password: "Qwerty1",
  };
}

module.exports = { generateUser };
