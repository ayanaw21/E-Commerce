type User = {
    id :string,
    email : string,
    password:string,
    isAdmin: boolean
}
export const mockUsers:User[] = [
  {
    id: "1",
    email: "user@test.com",
    password: "user123", // In real apps, NEVER store plain passwords!
    isAdmin: false,
  },
  {
    id: "2",
    email: "admin@test.com",
    password: "admin123",
    isAdmin: true,
  },
];