'use server';
/**
 * @fileOverview A Genkit flow for generating personalized beauty and barbering style recommendations.
 *
 * - aiStylistRecommendations - A function that handles the AI stylist recommendation process.
 * - AiStylistRecommendationsInput - The input type for the aiStylistRecommendations function.
 * - AiStylistRecommendationsOutput - The return type for the aiStylistRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiStylistRecommendationsInputSchema = z.object({
  userQuery: z.string().describe("The client's event or preferences for which a style recommendation is needed."),
  concept: z.enum(['salon', 'barberia']).describe("The type of service requested: 'salon' for beauty salon, 'barberia' for barber shop."),
});
export type AiStylistRecommendationsInput = z.infer<typeof AiStylistRecommendationsInputSchema>;

const AiStylistRecommendationsOutputSchema = z.object({
  recommendation: z.string().describe("The AI stylist's personalized style recommendation."),
});
export type AiStylistRecommendationsOutput = z.infer<typeof AiStylistRecommendationsOutputSchema>;

export async function aiStylistRecommendations(input: AiStylistRecommendationsInput): Promise<AiStylistRecommendationsOutput> {
  return aiStylistRecommendationsFlow(input);
}

const aiStylistPrompt = ai.definePrompt({
  name: 'aiStylistPrompt',
  input: {schema: AiStylistRecommendationsInputSchema},
  output: {schema: AiStylistRecommendationsOutputSchema},
  prompt: `Eres un estilista exclusivo de GM Beauty House. Sugiere un estilo ideal (peinado, arreglo o maquillaje) para el concepto de {{{concept}}} basado en el evento del cliente o sus preferencias. Sé breve y lujoso en tu lenguaje.\n\nCliente: {{{userQuery}}}`,
});

const aiStylistRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiStylistRecommendationsFlow',
    inputSchema: AiStylistRecommendationsInputSchema,
    outputSchema: AiStylistRecommendationsOutputSchema,
  },
  async (input) => {
    const {output} = await aiStylistPrompt(input);
    return output!;
  }
);
