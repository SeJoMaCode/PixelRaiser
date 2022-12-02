/* GET home page. */
const index = (req, res) => {
    res.render('index', { title: 'PixelRaiser' });
}

const gettingStarted = (req, res) => {
    res.render('gettingStarted', { title: 'Getting Started' })
}

module.exports = {
    index,
    gettingStarted
};