export const generateContract = async (req, res) => {
    const { type, jurisdiction, customDetails } = req.body;
    
    // Artificial delay to simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const contractText = `This ${type} Agreement is made and entered into under the jurisdiction of ${jurisdiction}.\n\nParties acknowledge the responsibilities outlined herein.\n\nDetails:\n${customDetails}\n\n1. OBLIGATIONS\nParty A shall deliver services while Party B compensates appropriately. Any failure to meet these terms may result in termination.\n\n2. LIABILITY\nThe liability is capped at the total contract value. However, no limitations apply in cases of gross negligence.\n\n3. TERMINATION\nEither party may terminate with a 30-day notice.`;

    res.json({ success: true, contract: contractText });
};

export const analyzeRisk = async (req, res) => {
    const { contract } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock risk analysis
    const risks = [
        {
            level: 'high',
            text: 'no limitations apply in cases of gross negligence',
            suggestion: 'Specify the cap even for gross negligence or explicitly list covered damages to avoid open-ended liability.'
        },
        {
            level: 'moderate',
            text: 'terminate with a 30-day notice',
            suggestion: 'Consider adding mutual right to cure within 15 days before termination takes effect.'
        }
    ];

    res.json({ success: true, risks });
};

export const chatWithAssistant = async (req, res) => {
    const { message, context } = req.body;

    await new Promise(resolve => setTimeout(resolve, 1000));

    let reply = "I am a mock AI legal assistant. I can help explain clauses, suggest templates, and answer general questions based on the selected jurisdiction.";
    
    if (message.toLowerCase().includes("risk")) {
        reply = "When evaluating risk, look for 'indemnification' or 'liability caps'. Would you like me to highlight those in your text?";
    } else if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
        reply = "Hello! I'm SmartContract AI Assistant. How can I help you draft or review your contract today?";
    }

    res.json({ success: true, response: reply });
};
