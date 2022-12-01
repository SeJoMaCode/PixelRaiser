var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main.js');
const ctrlCanvasas = require('../controllers/canvases.js');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);
router.get('/getting-started', ctrlMain.gettingStarted)
router.get('/archive', ctrlCanvasas.archiveCanvases);
router.get('/canvases', ctrlCanvasas.currentCanvases);
router.get('/canvas/:canvasName', ctrlCanvasas.canvasInfo);
module.exports = router;
