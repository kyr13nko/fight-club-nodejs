import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  createFighter(fighterData) {
    // Перевірка на унікальність імені
    const existingFighter = fighterRepository.getOne({ name: fighterData.name.toLowerCase() });
    if (existingFighter) {
      throw Error("Fighter with this name already exists");
    }

    // Створення нового бійця
    const fighter = fighterRepository.create(fighterData);
    return fighter;
  }

  updateFighter(id, fighterDataToUpdate) {
    // Перевірка наявності бійця
    const existingFighter = fighterRepository.getOne({ id });
    if (!existingFighter) {
      throw Error("Fighter not found");
    }

    // Оновлення бійця
    const updatedFighter = fighterRepository.update(id, fighterDataToUpdate);
    return updatedFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
