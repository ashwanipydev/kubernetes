/**
 * AI Engine Module
 * Handles interactions with the Gemini API for tutoring and explanations
 */

const apiKey = "AIzaSyCf41SuxtUadVSwtbyZ1dBazNXHnyj22yU"; // Managed by environment
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

/**
 * Core function to call the Gemini API with exponential backoff
 */
async function callGemini(prompt, systemInstruction = "") {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;
    
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    let delay = 1000;
    for (let i = 0; i < 5; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const result = await response.json();
            return result.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (error) {
            if (i === 4) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
}

/**
 * Explains a specific Kubernetes concept based on user level
 */
export async function explainConcept(concept, level = 'beginner') {
    const systemPrompt = `You are an expert Kubernetes Tutor. 
    Explain concepts simply for a ${level} level learner. 
    Use analogies where possible. Keep it concise but technicaly accurate.`;
    
    const userPrompt = `Explain the following Kubernetes concept in detail: ${concept}`;
    
    return await callGemini(userPrompt, systemPrompt);
}

/**
 * Generates a practice problem for a specific day/topic
 */
export async function generatePracticeProblem(topic) {
    const systemPrompt = `You are a CKA/CKAD examiner. 
    Create a practical, hands-on scenario for the user to solve. 
    Include: 1. Objective, 2. Requirements, 3. A hint.`;
    
    const userPrompt = `Generate a practice problem for: ${topic}`;
    
    return await callGemini(userPrompt, systemPrompt);
}

/**
 * General Chat Assistant for the app
 */
export async function askAssistant(question, context = "") {
    const systemPrompt = `You are the K8s Mastery Pro Assistant. 
    You help users navigate their 30-day Kubernetes journey. 
    Context of current lesson: ${context}`;
    
    return await callGemini(question, systemPrompt);
}