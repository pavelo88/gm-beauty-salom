
'use server';
/**
 * @fileOverview Flujo de Genkit para generar recomendaciones personalizadas de estilo de belleza y barbería.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiStylistRecommendationsInputSchema = z.object({
  userQuery: z.string().describe("El evento o preferencia del cliente para el cual necesita una recomendación de estilo."),
  concept: z.enum(['salon', 'barberia']).describe("El tipo de servicio solicitado: 'salon' para belleza femenina, 'barberia' para barbería masculina."),
});
export type AiStylistRecommendationsInput = z.infer<typeof AiStylistRecommendationsInputSchema>;

const AiStylistRecommendationsOutputSchema = z.object({
  recommendation: z.string().describe("La recomendación personalizada del estilista AI."),
});
export type AiStylistRecommendationsOutput = z.infer<typeof AiStylistRecommendationsOutputSchema>;

export async function aiStylistRecommendations(input: AiStylistRecommendationsInput): Promise<AiStylistRecommendationsOutput> {
  return aiStylistRecommendationsFlow(input);
}

const aiStylistPrompt = ai.definePrompt({
  name: 'aiStylistPrompt',
  input: {schema: AiStylistRecommendationsInputSchema},
  output: {schema: AiStylistRecommendationsOutputSchema},
  prompt: `Eres el estilista principal de GM Beauty House en el Sur de Quito. 
Tu objetivo es sugerir un estilo ideal (peinado, tratamiento o arreglo) basándote en la solicitud real del cliente.
No des respuestas genéricas ni filosóficas. Sé directo y sugiere un servicio que el cliente pueda encontrar en nuestro menú (ej: Balayage, Corte de Autor, Hidratación Profunda).
Usa un tono profesional, elegante y local. 

Solicitud del cliente: "{{{userQuery}}}"
Concepto: {{{concept}}} (salon para mujeres, barberia para hombres)
`,
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
