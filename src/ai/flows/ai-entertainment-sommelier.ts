'use server';
/**
 * @fileOverview An AI entertainment sommelier for the GM Beauty House lounge.
 *
 * - aiEntertainmentSommelier - A function that handles the entertainment sommelier process.
 * - AiEntertainmentSommelierInput - The input type for the aiEntertainmentSommelier function.
 * - AiEntertainmentSommelierOutput - The return type for the aiEntertainmentSommelier function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiEntertainmentSommelierInputSchema = z.object({
  customerPreference: z.string().describe('The client\'s current mood or situation, e.g., "Estoy esperando a mi novia con mis amigos y queremos relajarnos."'),
  availableMenuItems: z.array(z.object({
    name: z.string().describe('Name of the menu item.'),
    price: z.string().describe('Price of the menu item, e.g., "$5.50".'),
    category: z.string().optional().describe('Category of the menu item, e.g., "Comida" or "Bebidas".'),
  })).describe('A list of available food and drink items from the lounge menu.'),
  availableGamingOptions: z.array(z.string()).describe('A list of available games in the Gamer Zone.'),
});
export type AiEntertainmentSommelierInput = z.infer<typeof AiEntertainmentSommelierInputSchema>;

const AiEntertainmentSommelierOutputSchema = z.object({
  recommendation: z.string().describe('A friendly and relaxed overall recommendation for the client, including snack, drink, and game.'),
  snack: z.string().describe('The suggested snack item from the menu. Must be one of the availableMenuItems.'),
  drink: z.string().describe('The suggested drink item from the menu. Must be one of the availableMenuItems.'),
  game: z.string().describe('The suggested game from the Gamer Zone. Must be one of the availableGamingOptions.'),
});
export type AiEntertainmentSommelierOutput = z.infer<typeof AiEntertainmentSommelierOutputSchema>;

export async function aiEntertainmentSommelier(input: AiEntertainmentSommelierInput): Promise<AiEntertainmentSommelierOutput> {
  return aiEntertainmentSommelierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiEntertainmentSommelierPrompt',
  input: { schema: AiEntertainmentSommelierInputSchema },
  output: { schema: AiEntertainmentSommelierOutputSchema },
  prompt: `Eres el anfitrión VIP del Lounge en GM Beauty House. Tu objetivo es sugerir un combo perfecto (incluyendo un snack, una bebida y un juego) para hacer amena la espera del cliente, manteniendo un tono muy amigable y relajado.

Aquí está el menú disponible de snacks y bebidas:
{{#if availableMenuItems}}
  {{#each availableMenuItems}}
    - {{this.name}} ({{this.category}}): {{this.price}}
  {{/each}}
{{else}}
  No hay elementos de menú disponibles.
{{/if}}

Aquí están los juegos disponibles en nuestra Gamer Zone (PS5/Xbox):
{{#if availableGamingOptions}}
  {{#each availableGamingOptions}}
    - {{this}}
  {{/each}}
{{else}}
  No hay juegos disponibles.
{{/if}}

Considerando la siguiente situación del cliente: "{{customerPreference}}".

Por favor, recomienda un combo perfecto. Ensure that the snack and drink are from the provided menu items, and the game is from the provided gaming options.
`,
});

const aiEntertainmentSommelierFlow = ai.defineFlow(
  {
    name: 'aiEntertainmentSommelierFlow',
    inputSchema: AiEntertainmentSommelierInputSchema,
    outputSchema: AiEntertainmentSommelierOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("No output received from the AI entertainment sommelier.");
    }
    return output;
  }
);
