const mongoose = require('mongoose');
const Canv = mongoose.model('Canvas');

const Canvases = (req, res) => {
    Canv.find({active: req.body.active}, (err, docs) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(200)
                .json(docs)
        }
    })
};
const canvasCreate = (req, res) => {
    Canv.findOne({name: req.body.name}, (err, docs) => {
        if(err){
            res
                .status(400)
                .json(err)
        } else {
            if(!docs){
                Canv.create({
                    name: req.body.name,
                    active: req.body.active,
                    description: req.body.description,
                    owner: req.body.owner
                }, (err, canvas) => {
                    if (err) {
                        res
                            .status(400)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json({message: 'success'})
                    }
                });
            } else {
                res
                    .status(200)
                    .json({
                        "message": "exists"
                    })
            }
        }

    })
};
const canvasReadOne = (req, res) => {
    Canv
        .findOne({name: req.params.canvasName})
        .exec((err, canvas) => {
            if (!canvas) {
                return res
                    .status(404)
                    .json({
                        "message": "canvas not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(canvas);
        });
};
const canvasUpdateOne = (req, res) => {
    res
        .status(200)
        .json({"message" : "Not yet implemented"});
};
const canvasDeleteOne = (req, res) => {
    res
        .status(200)
        .json({"message" : "Not yet implemented"});
};
const pixelReadOne = (req, res) => {
    const name = req.params.canvasName;
    if (name) {
        Canv
            .findOne({name: name})
            .select('pixels')
            .exec((err, canvas) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    let pixel = canvas.pixels.find(el => el.x == req.params.xCoord && el.y == req.params.yCoord)
                    if(pixel){
                        res
                            .status(200)
                            .json(pixel)
                    } else {
                        res
                            .status(404)
                            .json({
                                "message": "Pixel not found"
                            });
                    }
                }
            });
    } else {
        res
            .status(404)
            .json({"message": "Canvas not found"});
    }
};
const pixelUpdateOne = (req, res) => {
    const name = req.params.canvasName;
    if (name) {
        Canv
            .findOne({name: name})
            .select('pixels')
            .exec((err, canvas) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    let pixel = canvas.pixels[parseInt(req.params.yCoord)+50*req.params.xCoord]
                    if(pixel){
                        pixel.r = req.body.r;
                        pixel.g = req.body.g;
                        pixel.b = req.body.b;
                        canvas.save((err, pxl) => {
                            if(err){
                                res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(pxl)
                            }
                        })
                    } else {
                        res
                            .status(404)
                            .json({
                                "message": "pixel not found"
                            });
                    }
                }
            });
    } else {
        res
            .status(404)
            .json({"message": "Canvas not found"});
    }
};

module.exports = {
    Canvases,
    canvasCreate,
    canvasReadOne,
    canvasUpdateOne,
    canvasDeleteOne,
    pixelReadOne,
    pixelUpdateOne
};