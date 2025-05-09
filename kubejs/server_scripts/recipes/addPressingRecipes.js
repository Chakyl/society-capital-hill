console.info("[SOCIETY] addPressingRecipes.js loaded");

ServerEvents.recipes((e) => {
  const createPressingRecipe = (input, output) => {
    e.custom({
      type: "create:pressing",
      ingredients: [
        {
          item: input,
        },
      ],
      results: [
        {
          item: output,
        },
      ],
    });
  };

  const recipes = [
    {
      input: "oreganized:lead_ingot",
      output: "oreganized:lead_sheet",
    },
    {
      input: "oreganized:silver_ingot",
      output: "oreganized:silver_sheet",
    },
  ];
  recipes.forEach((recipe) => {
    createPressingRecipe(recipe.input, recipe.output);
  });
});
