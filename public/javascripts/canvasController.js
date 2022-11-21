let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

const rows = 50;
const collumns = 50;
const width = c.width;
const height = c.height;
const pixelWidth = width < height ? width/rows : height/collumns;
const color = {r:255, g:255, b:255}
let pixels = Array.from(Array(rows), () => new Array(collumns).fill(color))
let selectedX, selectedY = 1
let pixelOutput = document.getElementById('pixelOutput')
let redSlider = document.getElementById('redSlider')
let greenSlider = document.getElementById('greenSlider')
let blueSlider = document.getElementById('blueSlider')
let redLabel = document.getElementById('redLabel')
let greenLabel = document.getElementById('greenLabel')
let blueLabel = document.getElementById('blueLabel')
let pixelPreview = document.getElementById('pixelPreview')
let changeBtn = document.getElementById('changeBtn')
const server = window.location.protocol+'//'+window.location.hostname+':'+window.location.port; //http://localhost:3000

let info;
axios.get(server + '/api/canvas/'+document.title)
    .then(res => {
        info = res.data;
        window.requestAnimationFrame(draw);
    })
    .catch(err => {
        console.error(err)
    })

c.addEventListener("mousedown", function(e){
    let rect = c.getBoundingClientRect();
    let x = Math.ceil((e.clientX - rect.left)/16);
    let y = Math.ceil((e.clientY - rect.top)/16);
    redSlider.value = pixels[x-1][y-1].r;
    greenSlider.value = pixels[x-1][y-1].g;
    blueSlider.value = pixels[x-1][y-1].b;
    pixelOutput.innerHTML = `${x}, ${y}`;
    selectedX = x;
    selectedY = y;
});

changeBtn.addEventListener("click", function(e){    
    axios.put(`${server}/api/canvas/Test/pixel/${selectedX-1}/${selectedY-1}`, {
                                                                                            r: redSlider.value,
                                                                                            g: greenSlider.value,
                                                                                            b: blueSlider.value
                                                                                            })
});

async function draw() {
    ctx.clearRect(0, 0, width, height);

    redLabel.innerHTML = redSlider.value
    greenLabel.innerHTML = greenSlider.value
    blueLabel.innerHTML = blueSlider.value
    pixelPreview.style.background = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`


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

