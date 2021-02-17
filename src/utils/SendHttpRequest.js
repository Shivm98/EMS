const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // preparing the request
        xhr.open(method, url);

        // getting by default JSON 
        xhr.responseType = 'json';

        // Adding Header Config
        // if(data){
            // 'content-type': 'application/x-www-form-urlencoded'
            // 'Content-Type', 'application/json'
        //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // }

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


// const sendData = () => {
//     const data = {
//         email: 'shiv@shiv.com',
//     }

//     sendHttpRequest('POST', '/admin/events', data)
//         .then(responseData => {
//             console.log(responseData)
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };


export default sendHttpRequest;