
'use server';
/**
 * @fileOverview Flujo de Genkit que proporciona sugerencias de personal shopper impulsadas por IA.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPersonalShopperSuggestionsInputSchema = z.object({
  userPrompt: z.string().describe('La solicitud del usuario para consejos de moda o fragancias.'),
  category: z.enum(['mujer', 'hombre', 'perfumes']).describe('La categoría activa para las sugerencias.'),
});
export type AiPersonalShopperSuggestionsInput = z.infer<typeof AiPersonalShopperSuggestionsInputSchema>;

const AiPersonalShopperSuggestionsOutputSchema = z.string().describe('Consejos curados de moda o perfume adaptados a la solicitud.');
export type AiPersonalShopperSuggestionsOutput = z.infer<typeof AiPersonalShopperSuggestionsOutputSchema>;

export async function aiPersonalShopperSuggestions(input: AiPersonalShopperSuggestionsInput): Promise<AiPersonalShopperSuggestionsOutput> {
  return aiPersonalShopperSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalShopperPrompt',
  input: { schema: AiPersonalShopperSuggestionsInputSchema },
  output: { schema: AiPersonalShopperSuggestionsOutputSchema },
  prompt: `Eres un personal shopper experto de GM Boutique en el Sur de Quito.
Sugiere una prenda, outfit o fragancia de nuestra categoría de {{{category}}} basándote en lo que busca el usuario.
Usa un lenguaje persuasivo, sofisticado y exclusivo. 
Haz que el cliente sienta que la pieza es única para su estilo.

Solicitud del usuario: "{{{userPrompt}}}"`,
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
