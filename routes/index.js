import axios from 'axios';
import "dotenv/config.js";

const constructorMethod = (app) => {
    // Home Route
    app.get("/", async (req, res) => {
        try {
            return res.status(200).render("index", {});
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    });

    // Word Route
    app.get('/:word', async (req, res) => {
        let word = req.params.word;
        word = word.trim();
        if (word === "") {
            return res.status(400).json({ error: 'Word cannot be empty' });
        }

        try {
            console.log(word);
            let base_url =
                `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}`;

            let { data } = await axios.get(base_url);

            // If the word is invalid and has no suggestions
            if (Array.isArray(data) && data.length === 0) {
                console.log("User entered an invalid word. The Dictionary API did not provide suggestions.");
                return res.status(404).render("words/invalid_word", {});
            } 
            // If the word is invalid and has suggestions
            else if (Array.isArray(data) && typeof data[0] === 'string') {
                const suggestions = data;
                console.log("User entered an invalid word. The Dictionary API provided suggestions.");
                return res.status(302).render("words/invalid_word", { suggestions: suggestions });
            }

            // For valid word response
            let shortdef = data[0].shortdef;
            return res.status(200).render("words/word", { word: word, definitions: shortdef });

        } catch (e) {
            res.status(500).json({ error: e });
        }
    });

    // Catch-all route for undefined paths (redirect to home)
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

export default constructorMethod;