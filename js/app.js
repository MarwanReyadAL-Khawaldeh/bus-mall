'use strict';

let busMall = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg',

];
function shop(name) {
    this.name = name;
    this.image = `./img/${name}`;
    this.clickCounter = 0;
    this.shown = 0;
    shop.all.push(this);
}
shop.all = [];
shop.counter = 0;

for (let i = 0; i < busMall.length; i++) {
    new shop(busMall[i]);

}

console.log(shop.all);


const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const middleImage = document.getElementById('middleImage');
const rightImage = document.getElementById('rightImage');
let buttonElement = document.getElementById('show-result');
let ulElement = document.getElementById('sort-data');



let leftShopIndex = 0;
let middleShopIndex = 0;
let rightShopIndex = 0;
const counterOfClick = 23;
let backIndex = [];




function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function renderShop() {
    buttonElement.style.display = 'none';
    ulElement.style.display = 'none';

    let leftIndex ;
    do{
        leftIndex = randomNumber(0, shop.all.length - 1);
    }while(backIndex.indexOf(leftIndex) !== -1);
    leftImage.src = shop.all[leftIndex].image;
    leftImage.alt = shop.all[leftIndex].name;
    leftShopIndex = leftIndex;

    let middleIndex;
    do {
        middleIndex = randomNumber(0, shop.all.length - 1);
    } while (leftIndex === middleIndex || backIndex.indexOf(middleIndex) !== -1);
    middleImage.src = shop.all[middleIndex].image;
    middleImage.alt = shop.all[middleIndex].name;
    middleShopIndex = middleIndex;


    let rightIndex;
    do {
        rightIndex = randomNumber(0, shop.all.length - 1);
    } while (leftIndex === rightIndex || middleIndex === rightIndex || backIndex.indexOf(rightIndex) !== -1);
    rightImage.src = shop.all[rightIndex].image;
    rightImage.alt = shop.all[rightIndex].name;
    rightShopIndex = rightIndex;
    backIndex[0]=leftIndex;
    backIndex[1]=middleIndex;
    backIndex[2]=rightIndex;
    shop.all[leftShopIndex].shown++;
    shop.all[middleShopIndex].shown++;
    shop.all[rightShopIndex].shown++;
}


function handelClick(event) {
    if (shop.counter < counterOfClick) {

        const clickElement = event.target;

        if (clickElement.id === 'leftImage' || clickElement.id === 'middleImage' || clickElement.id === 'rightImage') {

            if (clickElement.id === 'leftImage') {
                shop.all[leftShopIndex].clickCounter++;
            }

            if (clickElement.id === 'middleImage') {
                shop.all[middleShopIndex].clickCounter++;
            }

            if (clickElement.id === 'rightImage') {
                shop.all[rightShopIndex].clickCounter++;
            }

            shop.counter++;
            renderShop();
            console.log(shop.all);
        }

    }
    else {
        buttonElement.style.display = 'block';
    }

}

function showData(event) {
    ulElement.style.display = 'block';
    for (let i = 0; i < shop.all.length; i++) {
        const liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        liElement.textContent = `${shop.all[i].name} had ${shop.all[i].clickCounter} votes, and was seen ${shop.all[i].shown} times.`;
    }
    buttonElement.removeEventListener('click', showData, true);
    imageSection.removeEventListener('click', handelClick, true);
}
buttonElement.addEventListener('click', showData);
buttonElement.addEventListener('click', renderChart);
imageSection.addEventListener('click', handelClick);

renderShop();

function renderChart() {

    let nameArray = [];
    let clicksArray = [];
    let myChart;
    let shownArray = [];

    for (let i = 0; i < shop.all.length; i++) {
        nameArray.push(shop.all[i].name);
        clicksArray.push(shop.all[i].clickCounter);
        shownArray.push(shop.all[i].shown);

    }

    let ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameArray,
            datasets: [
                {
                    label: '# of Votes',
                    data: clicksArray,
                    backgroundColor: 'rgb(255,255,255)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 3
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}




