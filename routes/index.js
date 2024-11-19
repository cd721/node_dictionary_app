import axios from 'axios'
const constructorMethod = (app) => {
    app.get("/", async (req, res) => {
        try {

            return res.status(200).render("index", {});
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.get('/:word', async (req, res) => {
        let word = req.params.word;
        word = word.trim();
        if (word === "") {
            return res.status(400).json({ error: e });
        }


        try {
            console.log(word)
            let base_url =
                `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`;


            let { data } = await axios.get(base_url, {
                params: {
                    'key': `${process.env.API_KEY}`
                }
            })

            if (data == []) {
                console.log("User entered an invalid word. The Dictionary API did not provide suggestions.")
                return res.status(404).render("invalid_word", {})
            } else if (Array.isArray(data) && typeof data[0] === 'string') {
                const suggestions = data;
                console.log("User entered an invalid word. The Dictionary API did not provide suggestions.")
                return res.status(302).render("invalid_word", { suggestions: suggestions });

            }
            console.log(data)
            shortdef = data[0]['shortdef']

            return res.status(200).render("word.html", { word: word, definitions: shortdef });



        } catch (e) {
            res.status(500).json({ error: e });
        }
    });
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

export default constructorMethod;