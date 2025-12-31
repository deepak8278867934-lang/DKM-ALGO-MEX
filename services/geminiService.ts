import { GoogleGenAI, Type } from "@google/genai";
import { Trade, AlertConfig, AlertCondition } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAlertSuggestion = async (trade: Trade): Promise<AlertConfig> => {
  try {
    const prompt = `
      Analyze this trade data:
      Symbol: ${trade.symbol}
      Entry Price: ${trade.entryPrice}
      Exit Price: ${trade.exitPrice}
      Type: ${trade.entryType}
      Strategy: ${trade.strategy}

      Suggest a logical trading alert configuration for re-entry or stop-loss monitoring based on this historical trade.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            price: { 
              type: Type.NUMBER,
              description: "The price level for the alert" 
            },
            condition: { 
              type: Type.STRING, 
              description: "The alert condition. Must be one of: 'Crossing Up', 'Crossing Down', 'Greater Than', 'Less Than'" 
            },
            message: { 
              type: Type.STRING,
              description: "A short description message for the alert" 
            }
          },
          required: ["price", "condition", "message"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const result = JSON.parse(text);

    // Map string condition to enum
    let conditionEnum = AlertCondition.CROSSING_UP;
    if (result.condition === 'Crossing Down') conditionEnum = AlertCondition.CROSSING_DOWN;
    else if (result.condition === 'Greater Than') conditionEnum = AlertCondition.GREATER_THAN;
    else if (result.condition === 'Less Than') conditionEnum = AlertCondition.LESS_THAN;

    return {
      symbol: trade.symbol,
      price: result.price || trade.entryPrice,
      condition: conditionEnum,
      message: result.message || `Alert for ${trade.symbol}`
    };

  } catch (error) {
    console.error("Error generating alert suggestion:", error);
    // Fallback default
    return {
      symbol: trade.symbol,
      price: trade.entryPrice,
      condition: trade.entryType === 'BUY ENTRY' ? AlertCondition.LESS_THAN : AlertCondition.GREATER_THAN,
      message: `Manual alert for ${trade.symbol}`
    };
  }
};