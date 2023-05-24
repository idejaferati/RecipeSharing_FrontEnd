import product1 from "../images/recipebook.png";
import product2 from "../images/cookbook.png";

export const PRODUCTS = [
  {
    id: 1,
    productName: "Recipe Book",
    price: 28.0,
    productImage: product1,
  },
  {
    id: 2,
    productName: "Cooking Book newest edition",
    price: 40.0,
    productImage: product2,
  },
  {
    id: 3,
    productName: "Cake Book",
    price: 20.0,
    productImage: product1,
  },
  {
    id: 4,
    productName: "Pasta Book newest edition",
    price: 30.0,
    productImage: product2,
  },
];

export const SHOPPING_LIST = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    user: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      dateOfBirth: "1985-03-15T00:00:00.000Z",
      email: "johndoe@example.com",
      roleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      role: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Administrator",
        policies: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Admin Policy",
            roles: ["Admin"],
          },
        ],
      },
      phoneNumber: "1234567890",
      saltedHashPassword: "a3f9b9c2e13ac0e511ac7b16fe26dab1",
      salt: "6dab1",
      recipes: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          user: "John Doe",
          name: "Chicken Parmesan",
          description: "Delicious chicken parmesan recipe",
          ingredients: [
            {
              id: "3qa85f64-5717-4562-b3fc-2c963f66afa6",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              name: "Chicken breast",
              amount: 12,
              unit: "pieces",
            },
            {
              id: "34a85f64-5717-4562-b3fc-2c963f66afa7",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              name: "Tomato sauce",
              amount: 1,
              unit: "cup",
            },
            {
              id: "3ra85f64-5717-4562-b3fc-2c963f66afa8",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              name: "Mozzarella cheese",
              amount: 1,
              unit: "cup",
            },
          ],
          instructions: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              stepNumber: 1,
              stepDescription: "Preheat the oven to 375°F.",
            },
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              stepNumber: 2,
              stepDescription: "Coat the chicken breasts with bread crumbs.",
            },
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              stepNumber: 3,
              stepDescription:
                "Place the chicken breasts in a baking dish and bake for 25 minutes.",
            },
          ],
          tags: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              name: "Italian",
              recipes: ["Chicken Parmesan"],
            },
          ],
          cuisineId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          cuisine: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Italian",
            recipes: ["Chicken Parmesan"],
          },
          prepTime: 20,
          cookTime: 30,
          servings: 4,
          yield: 4,
          calories: 350,
          audioInstructions: "https://example.com/audio/chicken-parmesan.mp3",
          videoInstructions: "https://example.com/video/chicken-parmesan.mp4",
          reviews: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              user: "John Doe",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              rating: 5,
              message: "This recipe is amazing!",
            },
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              user: "John Doe",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              rating: 3,
              message: "This recipe is amazing!",
            },
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              user: "John Doe",
              recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              recipe: "Chicken Parmesan",
              rating: 2,
              message: "This recipe is amazing!",
            },
          ],
          cookBook: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            user: "John Doe",
            name: "Favorite Recipes",
            description: "Collection of my favorite recipes",
            recipes: ["Chicken Parmesan"],
          },
          collections: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              name: "Weeknight Dinners",
              description: "Quick and easy dinner ideas",
              numberOfRecipes: 10,
              userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              user: "John Doe",
              recipes: ["Chicken Parmesan"],
            },
          ],
        },
      ],
      reviews: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          user: "John Doe",
          recipeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          recipe: "Chicken Parmesan",
          rating: 5,
          message: "This recipe is amazing!",
        },
      ],
    },
    name: "Chicken Parmesan",
    quantity: 2,
  },
];
