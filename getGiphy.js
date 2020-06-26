const API_KEY = "Wq8HjnPYU1fZKhJYH4wL3qs9VTcRQV61";
let cach = {};
const GifsFactory = () => {
    let hiddenXHR;
    return query => {
        if (hiddenXHR) {
            hiddenXHR.abort()
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            hiddenXHR = xhr;
            setTimeout(newFunction(xhr, query, reject, resolve), 500);
        });
    }
}

const getGifs = GifsFactory();

const someFunc = async (query) => {
    if (cach[query]) {
        result = cach[query];

        console.log("FROM CACH");
        console.log(result);

        return;
    }
    try {
        const result = await getGifs(query);
        cach[query] = result;
        console.log(result);
    } catch (err) {
        console.error("Something happened", err);
    }
};


document.querySelector('#gifs').addEventListener('input', (event) => {
    someFunc(event.target.value);
});

function newFunction(xhr, query, reject, resolve) {
    xhr.open("GET", `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=3&offset=0&rating=G&lang=en`);
    xhr.onload = function () {
        if (xhr.status != 200) {
            reject(xhr.status);
            return;
        }
        resolve(JSON.parse(xhr.response));
    };
    xhr.send();
}

