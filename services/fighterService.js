import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    return fighterRepository.getOne({ id });
  }

  createFighter(fighterData) {
    const existingFighter = fighterRepository.getOne({ name: fighterData.name.toLowerCase() });
    if (existingFighter) {
      throw Error("Fighter with this name already exists");
    }
    // Значення health встановлюється за замовчуванням на 85
    fighterData.health = 85;
    const fighter = fighterRepository.create(fighterData);
    return fighter;
  }

  updateFighter(id, fighterDataToUpdate) {
    const existingFighter = fighterRepository.getOne({ id });
    if (!existingFighter) {
      throw Error("Fighter not found");
    }
    // Збереження health при оновленні
    fighterDataToUpdate.health = existingFighter.health;
    const updatedFighter = fighterRepository.update(id, fighterDataToUpdate);
    return updatedFighter;
  }

  deleteFighter(id) {
    const existingFighter = fighterRepository.getOne({ id });
    if (!existingFighter) {
      throw Error("Fighter not found");
    }
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
