const mongoose = require('mongoose');
const Canv = mongoose.model('Canvas');

const CanvasesByName = (req, res) => {
    Canv.find({}, (err, docs) => {
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
                    name: req.body.name
                }, (err, canvas) => {
                    if (err) {
                        res
                            .status(400)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(canvas)
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
                    res
                        .status(400)
                        .json(canvas.pixels);
                    // let pixel = canvas.pixels.find(el => el.x == req.params.xCoord && el.y == req.params.yCoord)
                    // if(canvas.pixels[parseInt(req.params.yCoord)+50*req.params.xCoord]){
                    //     canvas.pixels[parseInt(req.params.yCoord)+50*req.params.xCoord].r = req.body.r;
                    //     canvas.pixels[parseInt(req.params.yCoord)+50*req.params.xCoord].g = req.body.g;
                    //     canvas.pixels[parseInt(req.params.yCoord)+50*req.params.xCoord].b = req.body.b;
                    //     canvas.save((err, pxl) => {
                    //         if(err){
                    //             res
                    //                 .status(404)
                    //                 .json(err);
                    //         } else {
                    //             res
                    //                 .status(200)
                    //                 .json(pxl)
                    //         }
                    //     })
                    // } else {
                    //     res
                    //         .status(404)
                    //         .json({
                    //             "message": "pixel not found"
                    //         });
                    // }
                }
            });
    } else {
        res
            .status(404)
            .json({"message": "Canvas not found"});
    }
};

module.exports = {
    CanvasesByName,
    canvasCreate,
    canvasReadOne,
    canvasUpdateOne,
    canvasDeleteOne,
    pixelReadOne,
    pixelUpdateOne
};