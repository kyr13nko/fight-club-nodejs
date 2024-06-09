import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  createUser(userData) {
    // Перевірка на унікальність email та phoneNumber
    const existingUser = userRepository.getOne({ email: userData.email });
    if (existingUser) {
      throw Error("User with this email already exists");
    }
    const existingPhoneNumberUser = userRepository.getOne({ phoneNumber: userData.phoneNumber });
    if (existingPhoneNumberUser) {
      throw Error("User with this phone number already exists");
    }

    // Створення нового користувача
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
