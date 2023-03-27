 const fs = require('fs');

class PokemonManager {
  constructor(path) {
    this.path = path;
  }

  addPokemon(pokemon) {
    const pokemons = this.getPokemons();
    const lastPokemon = pokemons[pokemons.length - 1];
    const id = lastPokemon ? lastPokemon.id + 1 : 1;
    const newPokemon = { id, ...pokemon };
    pokemons.push(newPokemon);
    fs.writeFileSync(this.path, JSON.stringify(pokemons));
    return newPokemon;
  }

  getPokemons() {
    const fileContent = fs.readFileSync(this.path, 'utf-8');
    return fileContent ? JSON.parse(fileContent) : [];
  }

  getPokemonById(id) {
    const pokemons = this.getPokemons();
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    return pokemon;
  }

  updatePokemon(id, updatedPokemon) {
    const pokemons = this.getPokemons();
    const index = pokemons.findIndex(pokemon => pokemon.id === id);
    if (index !== -1) {
      pokemons[index] = { ...pokemons[index], ...updatedPokemon, id };
      fs.writeFileSync(this.path, JSON.stringify(pokemons));
      return pokemons[index];
    }
  }

  deletePokemon(id) {
    const pokemons = this.getPokemons();
    const index = pokemons.findIndex(pokemon => pokemon.id === id);
    if (index !== -1) {
      const deletedPokemon = pokemons.splice(index, 1)[0];
      fs.writeFileSync(this.path, JSON.stringify(pokemons));
      return deletedPokemon;
    }
  }
}

module.exports = PokemonManager;

