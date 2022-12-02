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
const archiveCanvases = (req, res) => {
    const path = `/api/canvases`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {active: 0}
    };
    request(
        requestOptions,
        (err, response, body) => {
            const data = body;
            renderCanvasesArchive(req, res, data);
        }
    );
}

/* GET canvases home page. */
const renderCanvasesArchive = (req, res, responseBody) => {
    res.render('canvases', {
        title: 'Archived Canvases',
        canvases: responseBody
    });
}

const currentCanvases = (req, res) => {
    const path = `/api/canvases`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {active: 1}
    };
    request(
        requestOptions,
        (err, response, body) => {
            const data = body;
            renderCanvasesCurrent(req, res, data);
        }
    );
}

/* GET canvases home page. */
const renderCanvasesCurrent = (req, res, responseBody) => {
    res.render('canvases', {
        title: 'Ongoing Canvases',
        canvases: responseBody
    });
}

const renderCanvas = (req, res, canvas) => {
    res.render('canvas', {
        title: canvas.name,
        description: canvas.description,
        owner: canvas.owner,
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
    archiveCanvases,
    currentCanvases,
    canvasInfo
};