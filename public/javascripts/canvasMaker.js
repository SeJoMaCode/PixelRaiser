const server = (window.location.port) ? 'http://'+window.location.hostname+':'+window.location.port :
                                        'http://'+window.location.hostname;

let config = {
    headers: {
        "Accept": "application/json,text/plain, /",
        "Content-Type": "multipart/x-wwww-form-urlencoded"
    }
};

let submit = async () => {
    let loop = true
    document.getElementById('submit').style.display = 'none'
    axios.post(server+'/api/canvas', {  name: document.getElementById('name').value,
                                        description: document.getElementById('description').value,
                                        owner: document.getElementById('owner').value,
                                        active: 1
                                        })
            .then(res => {
                loop = false
                if(res.data.message == "exists"){
                    document.getElementById('submit').style.display = ''
                    document.getElementById('warning').innerHTML = 'Canvas with this name already exists'
                } else {
                    let url = encodeURI(server+"/canvas/"+document.getElementById('name').value)
                    document.location.href = url
                    document.getElementById('warning').innerHTML = `<a href="${url}">If you  did not get redirected your canvas can be accessed at ${url}</a>`
                }
            }, config)
            .catch(err => {
                console.error(err)
            })
    let dots = '' 
    while(loop){
        document.getElementById('warning').innerHTML = 'Creating'+dots
        dots+= '.'
        if(dots == '....'){
            dots = ''
        }
        await new Promise(r => setTimeout(r, 500));
    }
}