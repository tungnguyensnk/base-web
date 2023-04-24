let LINK = process.env.LINK || 'http://localhost:9999';
const api = (url, method, body) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let token = localStorage.getItem('token');
    if (token)
        myHeaders.append("Authorization", "Bearer " + token);
    let requestOptions = body === null ? {
        method: method,
        headers: myHeaders
    } : {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    return fetch(LINK + url, requestOptions)
}

export default api;
