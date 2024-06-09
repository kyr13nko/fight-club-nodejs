import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights

  createFight(fightData) {
    // Оновлення часу створення бою
    fightData.createdAt = new Date();

    // Створення нового бою
    const fight = fightRepository.create(fightData);
    return fight;
  }
}

const fightersService = new FightersService();

export { fightersService };
