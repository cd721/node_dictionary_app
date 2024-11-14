import axios from 'axios'
const constructorMethod = (app) => {
    app.get("/",async (req, res) => {
        try {

            return res.status(200).render("index",{});
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.get('/:word', async (req, res) => {
        try {
            if (req.params.word.trim() == "") {
                throw "Sorry, you didn't enter valid text"
            }


        } catch (e) {
            return res.status(400).json({ error: e });
        }


        try {
            console.log(req.params.word)
            let base_url = 
            `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${req.params.word}`;
            
            
            let { data } =await  axios.get(base_url, {
                params: {
                    'key': `${process.env.API_KEY}`
                }
            })

            console.log(data)
            return res.status(200).json({});
        } catch (e) {
            res.status(500).json({ error: e });
        }
    });
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

export default constructorMethod;