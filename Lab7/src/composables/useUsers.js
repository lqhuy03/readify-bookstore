import { ref } from 'vue';

const users = ref([]);

export function useUsers() {
  const addUser = (user) => {
    users.value.push(user);
  };

  const findUserByEmail = (email) => {
    return users.value.find(u => u.email === email);
  };

  const authenticateUser = (email, password) => {
    return users.value.find(u => u.email === email && u.password === password);
  };

  return {
    users,
    addUser,
    findUserByEmail,
    authenticateUser
  };
}
