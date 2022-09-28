/* GET home page. */
const index = (req, res) => {
    res.render('index', { title: 'PixelRaiser' });
}

// GET about page
const about = (req, res) => {
    res.render('about', { title: 'About PixelRaiser' })
}

const gettingStarted = (req, res) => {
    res.render('gettingStarted', { title: 'Getting Started' })
}

module.exports = {
    index,
    about,
    gettingStarted
};