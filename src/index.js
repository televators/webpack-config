import './styles/index.scss';

const elvenShieldRecipe = {
  leatherStrips: 2,
  ironIngots: 1,
  refinedMoonstone: 4
};

const elvenGauntletRecipe = {
  ...elvenShieldRecipe,
  leather: 1,
  refinedMoonstone: 5,
};

console.log(elvenShieldRecipe);
console.log(elvenGauntletRecipe);
