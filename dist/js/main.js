"use strict";

const foodTitle = document.querySelector(".food-title");
const foodTitleH2 = document.querySelector(".food-title h2");
const actTypeFoodDiv = document.querySelector(".active-type-food");
const menuParagraphs = document.querySelectorAll(".menu p");
const foodListUl = document.querySelector(".food-list ul");
const ingredients = document.querySelector(".items-ingredients ul");
const making = document.querySelector(".items-activities ol");
const rightWrapper = document.querySelector(".right-wrapper");

let nextNumMeal;
let typeFirstMeal = "Wczytywanie...";
let typeMealArr = [];
let numFirstMeal;
let actTypeFood = typeFirstMeal;
actTypeFoodDiv.innerText = actTypeFood;

const setMealTypeListener = (data) => {
    menuParagraphs.forEach((elem) => {
        elem.addEventListener("click", (e) => {
            actTypeFood = e.target.innerText;
            setValues(data, e.target.innerText, nextNumMeal);
            actTypeFoodDiv.innerText = actTypeFood;
        });
    });
};

const setFirstMealInMain = (clickedItemFromLeft) => {
    foodTitleH2.innerText = clickedItemFromLeft.nazwa;
    ingredients.innerHTML = "";
    making.innerHTML = "";
    rightWrapper.innerHTML = "";
    clickedItemFromLeft.skladniki.forEach((elem) => {
        const li = document.createElement("li");
        li.innerText = elem;
        ingredients.appendChild(li);
    });
    clickedItemFromLeft.przepis.forEach((elem) => {
        const li = document.createElement("li");
        li.innerText = elem;
        making.appendChild(li);
    });
    clickedItemFromLeft.obraz.forEach((elem) => {
        const img = document.createElement("img");
        img["src"] = elem;
        rightWrapper.appendChild(img);
    });
};

const setNameMealsInLeft = (typeFilteredArr) => {
    foodListUl.innerHTML = "";
    typeFilteredArr.forEach((elem, index) => {
        const li = document.createElement("li");
        li.addEventListener("click", (e) => {
            setFirstMealInMain(typeFilteredArr[index]);
        });
        li.innerText = elem.nazwa;
        foodListUl.appendChild(li);
    });
};

const setValues = (data, typeMeal, numFirstMeal) => {
    const typeFilteredArr = data.filter((elem) => {
        return elem.typ === typeMeal;
    });
    setNameMealsInLeft(typeFilteredArr);
    setFirstMealInMain(typeFilteredArr[numFirstMeal]);
};

window.onload = function (typeFirstMeal) {
    fetch("../config/config.json")
        .then((res) => res.json())
        .then((data) => {
            typeFirstMeal = data.typeFirstMeal;
            let actTypeFood = typeFirstMeal;
            actTypeFoodDiv.innerText = actTypeFood;
            numFirstMeal = data.numFirstMeal;
            nextNumMeal = data.nextNumMeal;
        });
    fetch("../config/przepisy.json") //* Pobieranie z JSON danych
        .then((res) => res.json()) //* Zmiana JSON w tablice obiektów js
        .then((data) => {
            switch (typeFirstMeal) {
                case "Dania główne":
                    setValues(data, typeMealArr[0], numFirstMeal);
                    break;
                case "Zupy":
                    setValues(data, typeMealArr[1], numFirstMeal);
                    break;
                case "Desery":
                    setValues(data, typeMealArr[2], numFirstMeal);
                    break;
                case "Przetwory":
                    setValues(data, typeMealArr[3], numFirstMeal);
                    break;
                default:
                    break;
            }

            setMealTypeListener(data);
        });
};

const getTypeMealFromDom = () => {
    menuParagraphs.forEach((elem) => {
        typeMealArr.push(elem.innerText);
    });
};

getTypeMealFromDom();

// TODO: 3.Zamienienie składników i przepisów na prawdziwe |X|
// TODO: 4.Stworzenie czytelnych komentarzy przy funkcjach |X|

//# sourceMappingURL=main.js.map
