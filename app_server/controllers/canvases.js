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

const currentCanvases = (req, res) => {
    const path = `/api/canvases`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
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
    res.render('canvasesCurrent', {
        title: 'Ongoing Canvases',
        // canvases: [{
        //     name: 'Test',
        //     active: true,
        //     description: 'test description',
        //     owner: 'SeJoMa',
        //     pixels: ''
        // },{
        //     name: 'Test3',
        //     active: true,
        //     description: 'test2 description',
        //     owner: 'SeJoMa',
        //     pixels: ''
        // }]
        canvases: responseBody
    });
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
    currentCanvases,
    canvasInfo
};