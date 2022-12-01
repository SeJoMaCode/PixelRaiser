let canvases = document.getElementsByTagName('canvas')
let ctxs = []

const server = (window.location.port) ? window.location.protocol+'//'+window.location.hostname+':'+window.location.port :
                                        window.location.protocol+'//'+window.location.hostname;

for(i in canvases){
    if(parseInt(i)+1){
        ctxs.push(canvases[i].getContext('2d'))
    }
}

function draw(){

    for(i in ctxs){
        let info;
        let index = i;
        axios.get(server+'/api/canvas/'+canvases[i].id)
            .then(res => {
                info = res.data;
                let pixels = Array.from(Array(50), () => new Array(50).fill({r:255, g:255, b:255}));
                for(let x = 0; x<50; x++){
                    for(let y=0; y<50; y++){
                        pixels[x][y] = info.pixels[y+50*x]
                        pixel = pixels[x][y];
                        ctxs[index].fillStyle = `rgb(${pixel.r},${pixel.g},${pixel.b})`
                        ctxs[index].fillRect(x*3, y*3, 3, 3);
                        
                    }
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

}

draw()