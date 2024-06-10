import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw Error("User not found!");
    }
    return user;
  }

  createUser(userData) {
    const existingUser = userRepository.getOne({ email: userData.email });
    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.status = 400;
      throw error;
    }

    const existingPhoneNumberUser = userRepository.getOne({ phoneNumber: userData.phoneNumber });
    if (existingPhoneNumberUser) {
      const error = new Error("User with this phone number already exists");
      error.status = 400;
      throw error;
    }

    const user = userRepository.create(userData);
    return user;
  }

  updateUser(id, userDataToUpdate) {
    // Перевірка наявності користувача
    const existingUser = userRepository.getOne({ id });
    if (!existingUser) {
      throw Error("User not found");
    }

    // Оновлення користувача
    const updatedUser = userRepository.update(id, userDataToUpdate);
    return updatedUser;
  }

  deleteUser(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw Error("User not found!");
    }
    userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
