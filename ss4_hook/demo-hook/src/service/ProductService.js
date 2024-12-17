const listProduct = [{id: 1, name: "IPhone 15", brand: "Apple"},
    {id: 2, name: "SamSung S21", brand: "SamSung"},
    {id: 3, name: "Oppo A7", brand: "Oppo"}];

export function getListProduct() {
    return listProduct;
}

export function addProduct(product){
    listProduct.push(product);
}

export function searchByName(name){
    return listProduct.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
}

export function deleteProductById(id){
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].id === id){
            listProduct.splice(i, 1);
            break;
        }
    }
}