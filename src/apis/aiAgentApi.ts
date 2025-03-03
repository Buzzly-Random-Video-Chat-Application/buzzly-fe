import { PIPE_API_KEY } from "../constants/endpoints";

export async function generateAnswer(message: string, onChunk: (chunk: string) => void): Promise<string> {
    const url = 'https://api.langbase.com/v1/pipes/run';
    const apiKey = PIPE_API_KEY;

    const data = {
        messages: [{ role: 'user', content: message }],
    };

    let fullText = "";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('API error body:', errorBody);
            throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
        }

        if (!response.body) {
            throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const jsonData = JSON.parse(line.substring(5));
                    if (jsonData && jsonData.choices && jsonData.choices.length > 0) {
                        const content = jsonData.choices[0]?.delta?.content || "";
                        if (content) {
                            fullText += content;
                            onChunk(content);
                        }
                        if (jsonData.choices[0]?.finish_reason === 'stop') {
                            console.log("Stream finished");
                            return fullText;
                        }
                    }
                }
            }
        }
        return fullText;
    } catch (error: unknown) {
        console.error('Error fetching AI response:', error);
        throw error;
    }
}