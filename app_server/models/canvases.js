const { json } = require('express');
const mongoose = require('mongoose');

const Pixel = new mongoose.Schema({
    r: {
            type: Number,
            required: true,
            defualt: 255,
            min: 0,
            max: 255
        },
    g: {
            type: Number,
            required: true,
            defualt: 255,
            min: 0,
            max: 255
        },
    b: {
            type: Number,
            required: true,
            defualt: 255,
            min: 0,
            max: 255
        }
});

let defualtPixels = [];
let defualtRow = [];
for ( let i = 0; i < 100; i++){
  defualtRow.push(Pixel)
}
for ( let i = 0; i < 100; i++){
    defualtPixels.push(defualtRow)
}
delete defualtRow;

const canvasSchema = new mongoose.Schema({
    name: {
            type: String,
            required: true
        },
    description: {
                    type: String,
                    required: false
                },
    owner: {
                type: String,
                Required: false
            },
    width: {
                type: Number,
                required: true,
                defualt: 100,
                min: 50,
                max: 500
            },
    height: {
                type: Number,
                required: true,
                defualt: 100,
                min: 50,
                max: 500
            },
    pixels: {
                type: [[Pixel]],
                required: true,
                default: defualtPixels
            }
});
delete defualtPixels;

mongoose.model('Canvas', canvasSchema);
