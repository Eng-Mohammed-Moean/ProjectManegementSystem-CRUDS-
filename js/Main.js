let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submet = document.getElementById("submet");
let total = document.getElementById("total");
let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");
let search = document.getElementById("search");
let mood = document.querySelector(".mood");
let container = document.querySelector(".container");
let body = document.querySelector("body");
let input = document.querySelector("input");
let moon = document.querySelector(".fa-moon");
let sun = document.querySelector(".fa-sun");


let mode = "create";
let globale;

// get totle

const getTotle = () => {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.background = "green";
    } else {
        total.innerHTML = " ";
        total.style.background = "rgb(217, 52, 74)";
    }
}

//creaet product
let Data_Product;
if (localStorage.prodoct != null) {
    //عشان ارجع ال اري لطبيعتها بعد الهندلة لازم استخدم (parse)
    Data_Product = JSON.parse(localStorage.prodoct);
} else {
    Data_Product = [];
}
submet.onclick = () => {
    let new_product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    // اضافة منتجات بعدد الكاونت المطلوب
    if (title.value != "" &&
        price.value != "" &&
        taxes.value != "" &&
        ads.value != "" &&
        discount.value != "" &&
        category.value != "" && new_product.count < 100) {
        if (mode == "create") {
            if (new_product.count > 1) {
                for (let index = 0; index < new_product.count; index++) {
                    Data_Product.push(new_product);
                }
            } else {
                Data_Product.push(new_product);
            }
        } else {
            Data_Product[globale] = new_product;
            mode = "create";
            submet.innerHTML = "Create";
            count.style.display = "block";
        }
        Clear_Data();
    }
    //save localStorage
    localStorage.setItem('prodoct', JSON.stringify(Data_Product));
    // console.log(Data_Product);
    Show_Data();
}

//clear input

const Clear_Data = () => {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
}

//read

const Show_Data = () => {
    getTotle();
    let table = " ";
    for (let index = 0; index < Data_Product.length; index++) {
        table += `
        <tr>
        <td>${index + 1}</td>
        <td>${Data_Product[index].title}</td>
        <td>${Data_Product[index].price}</td>
        <td>${Data_Product[index].taxes}</td>
        <td>${Data_Product[index].ads}</td>
        <td>${Data_Product[index].discount}</td>
        <td>${Data_Product[index].total}</td>
        <td>${Data_Product[index].category}</td>
        <td><button onclick="Update_Data(${index})" id="update">Update</button></td>
        <td><button onclick="Delete_Data(${index})" id="delete">Delete</button></td>
    </tr>
        `
    }
    tbody.innerHTML = table;
    if (Data_Product.length > 0) {
        deleteAll.innerHTML = `
        <button class= "btn" onclick="delete_All()" id="delete">DeleteAll(${Data_Product.length}) </button>
        `
    } else {
        deleteAll.innerHTML = " ";
    }
}

Show_Data();

//delete one object function

const Delete_Data = (i) => {
    Data_Product.splice(i, 1);
    localStorage.prodoct = JSON.stringify(Data_Product);
    Show_Data();

}


//deleteAll function
//ما تنسى انو البيانات موجودة في الاري و اللوكلستورج
const delete_All = () => {
    localStorage.clear(); //ححذف في اللوكلستورج
    Data_Product.splice(0); //حيحذف في الاري من الصفر للاخر
    Show_Data();
    search.value = "";


}

//update

const Update_Data = (index) => {
    title.value = Data_Product[index].title;
    price.value = Data_Product[index].price;
    taxes.value = Data_Product[index].taxes;
    ads.value = Data_Product[index].ads;
    discount.value = Data_Product[index].discount;
    category.value = Data_Product[index].category;
    getTotle();
    count.style.display = "none";
    submet.innerHTML = "Update";
    mode = "Update";
    globale = index;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}


//search 

let searshMood = "title";

const GetSearsgMood = (id) => {
    if (id == "searchTitle") {
        searshMood = "title";
    } else {
        searshMood = "category";
    }
    search.placeholder = `Searsh By ${searshMood} `;
    search.focus();
    search.value = "";
    Show_Data();
}


const searshData = (value) => {
    let table = "";
    for (let index = 0; index < Data_Product.length; index++) {
        if (searshMood == "title") {
            if (Data_Product[index].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${index}</td>
                <td>${Data_Product[index].title}</td>
                <td>${Data_Product[index].price}</td>
                <td>${Data_Product[index].taxes}</td>
                <td>${Data_Product[index].ads}</td>
                <td>${Data_Product[index].discount}</td>
                <td>${Data_Product[index].total}</td>
                <td>${Data_Product[index].category}</td>
                <td><button onclick="Update_Data(${index})" id="update">Update</button></td>
                <td><button onclick="Delete_Data(${index})" id="delete">Delete</button></td>
            </tr>
                `
            }
        } else if (Data_Product[index].category.includes(value.toLowerCase())) {
            table += `
            <tr>
            <td>${index}</td>
            <td>${Data_Product[index].title}</td>
            <td>${Data_Product[index].price}</td>
            <td>${Data_Product[index].taxes}</td>
            <td>${Data_Product[index].ads}</td>
            <td>${Data_Product[index].discount}</td>
            <td>${Data_Product[index].total}</td>
            <td>${Data_Product[index].category}</td>
            <td><button onclick="Update_Data(${index})" id="update">Update</button></td>
            <td><button onclick="Delete_Data(${index})" id="delete">Delete</button></td>
        </tr>
            `
        }
    }
    tbody.innerHTML = table;

}


mood.addEventListener("click", (eo) => {
    switch (eo.target.className) {
        case "fa-solid fa-sun":
            eo.target.style.color = "gold";
            body.style.background = "#FFF";
            title.style.background = "#FFF";
            price.style.background = "#FFF";
            taxes.style.background = "#FFF";
            ads.style.background = "#FFF";
            discount.style.background = "#FFF";
            category.style.background = "#FFF";
            count.style.background = "#FFF";
            search.style.background = "#FFF";
            title.style.border = "1px solid #111";
            price.style.border = "1px solid #111";
            taxes.style.border = "1px solid #111";
            ads.style.border = "1px solid #111";
            discount.style.border = "1px solid #111";
            category.style.border = "1px solid #111";
            count.style.border = "1px solid #111";
            search.style.border = "1px solid #111";
            title.style.color = "#000";
            price.style.color = "#000";
            taxes.style.color = "#000";
            ads.style.color = "#000";
            discount.style.color = "#000";
            category.style.color = "#000";
            count.style.color = "#000";
            search.style.color = "#000";
            moon.style.color = "#111";
            body.style.color = "#111";
            break;
        case "fa-solid fa-moon":
            eo.target.style.color = "#FFF";
            body.style.background = "#222";
            title.style.background = "#111";
            price.style.background = "#111";
            taxes.style.background = "#111";
            ads.style.background = "#111";
            discount.style.background = "#111";
            category.style.background = "#111";
            count.style.background = "#111";
            search.style.background = "#111";
            title.style.color = "#FFF";
            price.style.color = "#FFF";
            taxes.style.color = "#FFF";
            ads.style.color = "#FFF";
            discount.style.color = "#FFF";
            category.style.color = "#FFF";
            count.style.color = "#FFF";
            search.style.color = "#FFF";
            sun.style.color = "#FFF";
            body.style.color = "#FFF";
            break;

        default:
            break;
    }

})