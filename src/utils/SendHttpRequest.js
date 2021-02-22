const sendHttpRequest = (method, url, data, token) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // preparing the request
        xhr.open(method, url);
        console.log(url)
        // getting by default JSON 
        xhr.responseType = 'json';

        // Adding Header Config
        if(token){
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        xhr.onload = () => {
            if(xhr.status > 400){
                reject(xhr.response);
            }else{
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('network error');
        };

        // if not set responseType
        // xhr.send(JSON.stringify(data));

        // send data and actual request
        xhr.send(data);
    })
    return promise;
}



export default sendHttpRequest;