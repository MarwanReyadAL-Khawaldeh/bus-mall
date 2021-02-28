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
    this.image = `../img/${name}`;
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


function randomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max));

}
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



function renderShop() {
    buttonElement.style.display = 'none';
    ulElement.style.display = 'none';

    let leftIndex = randomNumber(0, shop.all.length - 1);
    leftImage.src = shop.all[leftIndex].image;
    leftImage.alt = shop.all[leftIndex].name;
    leftShopIndex = leftIndex;

    let middleIndex;
    do {
        middleIndex = randomNumber(0, shop.all.length - 1);
    } while (leftIndex === middleIndex);
    middleImage.src = shop.all[middleIndex].image;
    middleImage.alt = shop.all[middleIndex].name;
    middleShopIndex = middleIndex;


    let rightIndex;
    do {
        rightIndex = randomNumber(0, shop.all.length - 1);
    } while (leftIndex === rightIndex || middleIndex === rightIndex);
    rightImage.src = shop.all[rightIndex].image;
    rightImage.alt = shop.all[rightIndex].name;
    rightShopIndex = rightIndex;

    shop.all[leftIndex].shown++;
    shop.all[middleIndex].shown++;
    shop.all[rightIndex].shown++;




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
imageSection.addEventListener('click', handelClick);

renderShop();




