/* GET canvases home page. */
const canvasArchive = (req, res) => {
    res.render('canvasArchive', { title: 'Canvas Archive' });
}

/* GET canvases home page. */
const canvasesCurrent = (req, res) => {
    res.render('canvasesCurrent', { title: 'Ongoing Canvases' });
}

const canvas = (req, res) => {
    res.render('canvas', { title: 'Canvas' })
}


module.exports = {
    canvasArchive,
    canvasesCurrent,
    canvas
};