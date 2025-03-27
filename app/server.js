const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const TOGETHER_AI_API_KEY = "a394d31f95b3b7e56ddb06411a8505ded81ca49f200056b7a9bbd9c4b9276812";  // Replace with actual API key

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post("https://api.together.xyz/v1/chat/completions", {
            model: "mistralai/Mistral-7B-Instruct",
            messages: [{ role: "user", content: userMessage }],
        }, {
            headers: { Authorization: `Bearer ${TOGETHER_AI_API_KEY}` },
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Error processing request" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
