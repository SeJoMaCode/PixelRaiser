const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://pixelraiser.onrender.com';
}

const requestOptions = {
    url: 'http://yourapi.com/api/path',
    method: 'GET',
    json: {},
    qs: {
        offset: 20
    }
};
request(requestOptions, (err, response, body) => {
    if (err) {
        console.log(err);
    } else if (response.statusCode === 200) {
        console.log(body);
    } else {
        console.log(response.statusCode);
    }
});

/* GET canvases home page. */
const canvasArchive = (req, res) => {
    res.render('canvasArchive', { title: 'Canvas Archive' });
}

/* GET canvases home page. */
const canvasesCurrent = (req, res) => {
    res.render('canvasesCurrent', { title: 'Ongoing Canvases' });
}

const renderCanvas = (req, res, canvas) => {
    res.render('canvas', {
        title: canvas.name,
    });
}
const canvasInfo = (req, res) => {
    const path = `/api/canvas/${req.params.canvasName}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            const data = body;
            renderCanvas(req, res, data);
        }
    );
};


module.exports = {
    canvasArchive,
    canvasesCurrent,
    canvasInfo
};