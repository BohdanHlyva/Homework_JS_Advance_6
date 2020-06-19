const getS = selector => document.querySelector(selector);
const getSall = selector => document.querySelectorAll(selector);
let films;

getS(".search").addEventListener('click', function () {
    let name = getS(".input_search").value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${name}&apikey=5b54bc38`, false);
    xhr.send();
    let object = JSON.parse(xhr.responseText)
    films = object.Search
    remove();

    function main() {
        for (let i = 0; i < object.Search.length; i++) {
            let divBlock = document.createElement('div');
            divBlock.classList.add('block');
            let divBlock2 = document.createElement('div');
            divBlock2.classList.add('poster');
            let divBlock3 = document.createElement('div');
            divBlock3.classList.add('name');
            let divBlock4 = document.createElement('div');
            divBlock4.classList.add('add_info');
            let p1 = document.createElement('p');
            p1.classList.add('genre');
            let p2 = document.createElement('p');
            p2.classList.add('year');
            let input = document.createElement('input')
            input.classList.add('more_details_b')
            input.setAttribute('type', "button");
            input.setAttribute('value', "More details")
            getS('.main').appendChild(divBlock)
            divBlock.appendChild(divBlock2);
            divBlock.appendChild(divBlock3);
            divBlock.appendChild(divBlock4);
            divBlock4.appendChild(p1)
            divBlock4.appendChild(p2)
            divBlock.appendChild(input)
        }

        for (i = 0; i < films.length; i++) {
            getSall('.name')[i].textContent = films[i].Title
            getSall('.genre')[i].textContent = films[i].Type
            getSall('.year')[i].textContent = films[i].Year
            getSall('.poster')[i].style.backgroundImage = `url(${films[i].Poster})`
        }

        for (let i = 0; i < getSall('.more_details_b').length; i++) {
            getSall('.more_details_b')[i].addEventListener('click', function () {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `http://www.omdbapi.com/?i=${films[i].imdbID}&apikey=5b54bc38`, false);
                xhr.send();
                let object = JSON.parse(xhr.responseText)

                getS('.modal').style.display = 'flex'
                getS('.poster_big').style.backgroundImage = `url(${object.Poster})`
                getS('.main_info_title').textContent = object.Title
                getS('.main_info_small').textContent = object.Plot
                getS('.main_info_writen').innerHTML = ` <b>Written by:  </b> ${object.Writer}`
                getS('.main_info_directed').innerHTML = ` <b>Directed by:  </b> ${object.Director}`
                getS('.main_info_country').innerHTML = ` <b>Country:  </b> ${object.Country}`
                getS('.main_info_profit').innerHTML = ` <b>BoxOffice:  </b> ${object.BoxOffice}`
                getS('.main_info_awards').innerHTML = ` <b>Awards:  </b> ${object.Awards}`
                getS('.main_info_genre').innerHTML = ` <b>Genre:  </b> ${object.Genre}`
                getS('.main_info_during').innerHTML = ` <b>During:  </b> ${object.Runtime}`
                getS('.main_info_actors').innerHTML = ` <b>Actors:  </b> ${object.Actors} `
                getS('.main_info_rating').innerHTML = ` <b>Rating:  </b> ${object.imdbRating} `
            })
        }
    }

    if (getS('.input_search').value == '') {
        alert('Введіть щось')
    }
    else if (films == undefined) {
        getS('.input_search').value = ''
        alert('ФІльм не знайдено')
    }
    else {
        main();
    }
})

function remove() {
    if (getS('.main').children.length > 0) {
        let i = 0;
        while (getS('.main').children.length > i) {
            getS('.main').removeChild(getS('.block'));
        }
        i++
    }
}

window.onclick = function (event) {
    if (event.target == getS('.modal')) {
        getS('.modal').style.display = "none";
    }
}


