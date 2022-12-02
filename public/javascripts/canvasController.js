let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

const rows = 50;
const collumns = 50;
let width = c.width;
let height = c.height;
let pixelWidth = width < height ? width/rows : height/collumns;
const color = {r:255, g:255, b:255}
let pixels = Array.from(Array(rows), () => new Array(collumns).fill(color))
let selectedX = 1;
let selectedY = 1;
let pixelOutput = document.getElementById('pixelOutput')
let redSlider = document.getElementById('redSlider')
let greenSlider = document.getElementById('greenSlider')
let blueSlider = document.getElementById('blueSlider')
let redLabel = document.getElementById('redLabel')
let greenLabel = document.getElementById('greenLabel')
let blueLabel = document.getElementById('blueLabel')
let pixelPreview = document.getElementById('pixelPreview')
let changeBtn = document.getElementById('changeBtn')
const server = (window.location.port) ? window.location.protocol+'//'+window.location.hostname+':'+window.location.port :
                                        window.location.protocol+'//'+window.location.hostname;

let info;
axios.get(server + '/api/canvas/'+document.title)
    .then(res => {
        info = res.data;
        window.requestAnimationFrame(draw);
        resize();

    })
    .catch(err => {
        console.error(err)
    })

c.addEventListener("mousedown", (e) => {
    let rect = c.getBoundingClientRect()
    let x = Math.ceil((e.clientX-rect.left)/pixelWidth);
    let y = Math.ceil((e.clientY-rect.top)/pixelWidth);
    console.log(e.clientX, e.clientY)
    redSlider.value = pixels[x-1][y-1].r;
    greenSlider.value = pixels[x-1][y-1].g;
    blueSlider.value = pixels[x-1][y-1].b;
    pixelOutput.innerHTML = `${x}, ${y}`;
    selectedX = x;
    selectedY = y;
});
pixelOutput.innerHTML = `${selectedX}, ${selectedY}`;
window.addEventListener('resize', resize(), false);

changeBtn.addEventListener("click", function(e){    
    axios.put(`${server}/api/canvas/${document.title}/pixel/${selectedX-1}/${selectedY-1}`, {
                                                                                r: redSlider.value,
                                                                                g: greenSlider.value,
                                                                                b: blueSlider.value
                                                                                })
});

function resize() {
    let area = document.querySelector('.stuff')
    if(area.offsetWidth < area.offsetHeight){
        c.width = area.offsetWidth;
        c.height = area.offsetWidth;
    } else {
        c.width = area.offsetHeight;
        c.height = area.offsetHeight;
    }
    width = c.width;
    height = c.height;
    pixelWidth = width < height ? width/rows : height/collumns;
};

async function draw() {
    ctx.clearRect(0, 0, width, height);

    redLabel.innerHTML = 'Red: ' + redSlider.value
    greenLabel.innerHTML = 'Green: ' + greenSlider.value
    blueLabel.innerHTML = 'Blue: ' + blueSlider.value
    pixelPreview.style.background = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`
    redSlider.style.background = `linear-gradient(  to right,
        rgb(${0}, ${greenSlider.value}, ${blueSlider.value}),
        rgb(${255},${greenSlider.value}, ${blueSlider.value}))`
    greenSlider.style.background = `linear-gradient(  to right,
        rgb(${redSlider.value}, ${0}, ${blueSlider.value}),
        rgb(${redSlider.value},${255}, ${blueSlider.value}))`
    blueSlider.style.background = `linear-gradient(  to right,
        rgb(${redSlider.value}, ${greenSlider.value}, ${0}),
        rgb(${redSlider.value},${greenSlider.value}, ${255}))`


    for(let x = 0; x<rows; x++){
        for(let y=0; y<collumns; y++){
            pixels[x][y] = info.pixels[y+collumns*x]
            pixel = pixels[x][y];
            if(x===selectedX-1 && y===selectedY-1){
                ctx.fillStyle = 'black'
                let borderWidth = 2
                ctx.fillRect(x*pixelWidth, y*pixelWidth, pixelWidth, pixelWidth)
                ctx.fillStyle = `rgb(${pixel.r},${pixel.g},${pixel.b})`
                ctx.fillRect(x*pixelWidth+borderWidth, y*pixelWidth+borderWidth, pixelWidth-2*borderWidth, pixelWidth-2*borderWidth)
            }else{
                ctx.fillStyle = `rgb(${pixel.r},${pixel.g},${pixel.b})`
                ctx.fillRect(x*pixelWidth, y*pixelWidth, pixelWidth, pixelWidth);
            }
        }
    }

    await axios.get(server+'/api/canvas/'+document.title)
        .then(res => {
            info = res.data;
            window.requestAnimationFrame(draw);
        })
        .catch(err => {
            console.error(err)
        })
}

