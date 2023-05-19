const btnXHR = document.getElementById("xhrsearch");
const btnFetch = document.getElementById("fetchsearch");
const btnFetchAsyncAwait = document.getElementById("fetchAsyncAwaitSearch");

let searchQueryElement = document.getElementById("query");
let searchResults = document.getElementById("searchResults");

//const API_URL = "https://api.giphy.com/v1/gifs/search";
const API_URL = "https://api.giphy.com/v1/gifs/trending";
const API_KEY = "803atOQULZ8Z8niyk3EZzOAmSHAjYILO";


btnXHR.addEventListener("click", function () {
    
    searchUsingXHR(searchQueryElement.value);
})

btnFetch.addEventListener("click", function () {
    searchUsingFetch(searchQueryElement.value);
})

btnFetchAsyncAwait.addEventListener("click", function () {
    searchUsingFetchAwyncAwait(searchQueryElement.value);
})

//1- XHR Search
function searchUsingXHR(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    let params = "api_key=" + API_KEY + "&q=" + query + "&limit=5" + "&rating=g";
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //this gets executed when response is received
            showResults(JSON.parse(this.responseText));
        }
    })
    xhr.open("GET", API_URL + "?" + params);
    xhr.send();
}

//2 Fetch
function searchUsingFetch(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    let params = "api_key=" + API_KEY + "&q=" + query + "&limit=5" + "&rating=g";
    fetch(API_URL + "?" + params, { method: "GET" })
        .then((response) => {
            return response.text();

        })
        .then((data) => {
            showResults(JSON.parse(data))
        })
        .catch((e) => {
            console.error(e)
        });

}

//3 Fetch Awync Await
async function searchUsingFetchAwyncAwait(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    let params = "api_key=" + API_KEY + "&q=" + query + "&limit=5" + "&rating=g";
    let response = await fetch(API_URL + "?" + params, { method: "GET" });
    let data = await response.json();
    showResults(data);
}

function showResults(respObject) {
    for (item of respObject.data) {
        let imgElement = document.createElement("img");
        imgElement.src = item.images.downsized_medium.url;
        imgElement.alt = item.title;
        searchResults.appendChild(imgElement);
    }

}