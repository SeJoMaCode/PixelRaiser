const server = (window.location.port) ? window.location.protocol+'//'+window.location.hostname+':'+window.location.port :
                                        window.location.protocol+'//'+window.location.hostname;

let submit = async () => {
    let loop = true
    document.getElementById('submit').style.display = 'none'
    axios.post(server+'/api/canvas', {  name: document.getElementById('name').value,
                                        description: document.getElementById('description').value,
                                        owner: document.getElementById('owner').value,
                                        active: 1
                                        })
            .then(res => {
                if(res.data.message == "exists"){
                    loop = false
                    document.getElementById('submit').style.display = ''
                    document.getElementById('warning').innerHTML = 'Canvas with this name already exists'
                } else {
                    document.location.href = server+"/canvas/"+document.getElementById('name').value
                }
            })
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