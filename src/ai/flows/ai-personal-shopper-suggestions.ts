'use server';
/**
 * @fileOverview A Genkit flow that provides AI-powered personal shopper suggestions.
 *
 * - aiPersonalShopperSuggestions - A function that handles the personal shopper suggestion process.
 * - AiPersonalShopperSuggestionsInput - The input type for the aiPersonalShopperSuggestions function.
 * - AiPersonalShopperSuggestionsOutput - The return type for the aiPersonalShopperSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPersonalShopperSuggestionsInputSchema = z.object({
  userPrompt: z.string().describe('The user\'s request for fashion or perfume advice.'),
  category: z.enum(['mujer', 'hombre', 'perfumes']).describe('The active category (mujer, hombre, perfumes) for suggestions.'),
});
export type AiPersonalShopperSuggestionsInput = z.infer<typeof AiPersonalShopperSuggestionsInputSchema>;

const AiPersonalShopperSuggestionsOutputSchema = z.string().describe('Curated fashion or perfume advice tailored to the user\'s request.');
export type AiPersonalShopperSuggestionsOutput = z.infer<typeof AiPersonalShopperSuggestionsOutputSchema>;

export async function aiPersonalShopperSuggestions(input: AiPersonalShopperSuggestionsInput): Promise<AiPersonalShopperSuggestionsOutput> {
  return aiPersonalShopperSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalShopperPrompt',
  input: { schema: AiPersonalShopperSuggestionsInputSchema },
  output: { schema: AiPersonalShopperSuggestionsOutputSchema },
  prompt: `Eres un personal shopper de lujo en GM Beauty House.
Sugiere un outfit o fragancia específica de la categoría {{{category}}} para la ocasión que describe el usuario.
Usa un tono exclusivo y persuasivo.

Solicitud del usuario: {{{userPrompt}}}`,
});

const aiPersonalShopperSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiPersonalShopperSuggestionsFlow',
    inputSchema: AiPersonalShopperSuggestionsInputSchema,
    outputSchema: AiPersonalShopperSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
