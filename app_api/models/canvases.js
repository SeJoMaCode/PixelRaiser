const { json } = require('express');
const mongoose = require('mongoose');

const pixelSchema = new mongoose.Schema({
    x: {
        type: Number,
        min: 0,
        max: 49
        },
    y: {
        type: Number,
        min: 0,
        max: 49
        },
    r: {
            type: Number,
            defualt: 255,
            min: 0,
            max: 255
        },
    g: {
            type: Number,
            defualt: 255,
            min: 0,
            max: 255
        },
    b: {
            type: Number,
            defualt: 255,
            min: 0,
            max: 255
        }
});
const Pixel = mongoose.model('Pixel', pixelSchema)

let defualtPixels = [];
for ( let x = 0; x < 50; x++){
    for ( let y = 0; y < 50; y++){
        defualtPixels.push(new Pixel({  x: x,
                                        y: y,
                                        r: 255,
                                        g: 255,
                                        b: 255
                                    }))
    }
}

const canvasSchema = new mongoose.Schema({
    name: {
            type: String,
            required: true
        },
    active: {
        type: Boolean,
        default: true
    },
    description: {
                    type: String,
                },
    owner: {
                type: String,
            },
    width: {
                type: Number,
                defualt: 50,
                min: 50,
                max: 500
            },
    height: {
                type: Number,
                defualt: 50,
                min: 50,
                max: 500
            },
    pixels: {
                type: [pixelSchema],
                default: defualtPixels
            }
});
delete defualtPixels;

mongoose.model('Canvas', canvasSchema);
