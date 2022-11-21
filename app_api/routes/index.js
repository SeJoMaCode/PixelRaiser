const express = require("express");
const router = express.Router();
const ctrlCanvases = require('../controllers/canvases.js');

router
    .route('/canvases')
    .get(ctrlCanvases.CanvasesByName)

router
    .route('/canvas')
    .post(ctrlCanvases.canvasCreate);

router
    .route('/canvas/:canvasName')
    .get(ctrlCanvases.canvasReadOne)
    .put(ctrlCanvases.canvasUpdateOne)
    .delete(ctrlCanvases.canvasDeleteOne);

router
    .route('/canvas/:canvasName/pixel/:xCoord/:yCoord')
    .get(ctrlCanvases.pixelReadOne)
    .put(ctrlCanvases.pixelUpdateOne)

module.exports = router;