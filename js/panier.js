// ************************************************
// Shopping Cart API + Explication
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }





    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>"
            + "<td class='fs-6'>" + cartArray[i].name + "</td>"
            + "<td class='fs-6'>(" + cartArray[i].price + "€)</td>"
            + "</tr><tr>"
            + "<td><div class='input-group input-group-sm'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button type='button' class='btn btn-close btn-outline-danger delete-item' data-name=" + cartArray[i].name + "></button></td>"
            + " = "
            + "</tr><tr>"
            + "<td class='fs-6'>Sous-total : " + cartArray[i].total + "-€</td>"
            + "</tr>";
    }

    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());

    if (cartArray.length === 0) {
        // Add the class .open and show the menu
        $('.dropmen_pan_tgl').addClass('disabled');
    } else {
        // Add the class .open and show the menu
        $('.dropmen_pan_tgl').removeClass("disabled");
    }
}

// Delete item button


$('.dropmen_pan').on("click", ".dropcloser", function (event) {
    $('.dropmen_pan_tgl').removeClass('show');
    $('.dropdown-menu').removeClass('show');

})

$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    $('.dropmen_pan_tgl').removeClass('show');
    $('.dropdown-menu').removeClass('show');
})
// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
    

})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
    
});

$('.cartoshow').on("click", ".btn", function (event) {
    if (shoppingCart.totalCount() == 0) {
        location.reload();
    }
    if (shoppingCart.totalCount() == 1) {
        location.reload();
    }
})

/* panier.html #show-carte avec un E un "E" */

$('.carter').on("click", ".delete-item", function (event) {
    $('.dropmen_pan_tgl').removeClass('show');
    $('.dropdown-menu').removeClass('show');
    location.reload();
})
// -1
$('.carter').on("click", ".minus-item", function (event) {
    if (shoppingCart.totalCount() == 0) {
        location.reload();
    }
    if (shoppingCart.totalCount() == 1) {
        location.reload();
    }

})
// +1
$('.carter').on("click", ".plus-item", function (event) {
    if (shoppingCart.totalCount() == 0) {
        location.reload();
    }
    if (shoppingCart.totalCount() == 1) {
        location.reload();
    }
})

// Item count input
$('.carter').on("change", ".item-count", function (event) {
    if (shoppingCart.totalCount() == 0) {
        location.reload();
    }
    if (shoppingCart.totalCount() == 1) {
        location.reload();
    }
});
displayCart();

function pan_count() {

    var panier = `<!-- panier -->
    <div class="contaner-fluid">
        <div class="row h-100 justify-content-center m-0" id="panier-bg">
            <div class="col">
                <div class="text-center text-white">
                    <p class="planet votpan">VOTRE PANIER</p>
                </div>
                <img id="nuage" src="images/nuage.svg">
            </div>
        </div>
        <div class="row gap-3" id="panieroz">
            <div class="col-2"></div>
            <div class="col-6">
                <div class="row mb-3">
                    <div class="col-12 h12_pan planet">
                        <h1 class="fs-5 h1_pan">1. Options de livraison</h1>
                    </div>
                    <div class="form-contact arcon bordercolor pt-5 ps-3 pe-3 pb-3">
                        <form action="" class="form">
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="text" placeholder="" id="nom" name="nom">
                                <label for="nom">Nom</label>
                                <span class="focus-border"></span>
                            </div>
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="text" placeholder="" id="prénom" name="prénom">
                                <label for="prénom">Prénom</label>
                                <span class="focus-border"></span>
                            </div>
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="text" placeholder="" id="adresse" name="adresse postale">
                                <label for="adresse">Adresse</label>
                                <span class="focus-border"></span>
                            </div>
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="number" placeholder="" id="cp" name="code postal">
                                <label for="cp">Code Postal</label>
                                <span class="focus-border"></span>
                            </div>
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="text" placeholder="" id="ville" name="ville">
                                <label for="ville">Ville</label>
                                <span class="focus-border"></span>
                            </div>
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="text" placeholder="" id="pays" name="pays">
                                <label for="pays">Pays</label>
                                <span class="focus-border"></span>
                            </div>
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="email" placeholder="" id="email" name="email">
                                <label for="email">Email</label>
                                <span class="focus-border"></span>
                            </div>
                            <div class="col-nav input-effect">
                                <input class="effect-17" type="tel" placeholder="" id="tel" name="numéro telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
                                <label for="tel">Numéro de téléphone</label>
                                <span class="focus-border"></span>
                            </div>
                        <div class="fullwidth text-center">
                            <button class="btn h3a submit mt-2">enregistrer et continuer</button>
                            
                        </div>
                    </form>
                </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-12 h12_pan planet">
                        <h1 class="fs-5 h1_pan">2. PAIEMENT</h1>
                    </div>

                </div>
                <div class="row mb-5">
                    <div class="col-12 h12_pan planet">
                        <h1 class="fs-5 h1_pan">3. RÉCAPITULATIF DE LA COMMANDE</h1>
                    </div>

                </div>
            </div>
            <div class="text-black col-3">
                <div class="row bordercolor">
                <div class="col-12 planet h12_pan">dans votre panier</div>
                <hr>
                <div class="col-4"><img src="images/packaging.png" alt="packaging" width="100%"></div>
                <div class="col-8 arcon arcolr">
                    <p class="fs-6">Jeu ganais complet</p>
                    <table class="table arcon arcolr">
                    <tr style="border-style: unset !important">
                    <td class='fs-6'>Jeu</td>
                    <td class='fs-6'>(29€)</td>
                    </tr><tr style="border-style: unset !important">
                    <td>
                    <input type='number' class='item-count form-control' data-name="jeu" value="`+ shoppingCart.totalCount() +`" disabled>
                    </td>
                    </tr>
                    </table>
                </div>
                <div class="col-12 text-center">
                    <div class="fs-5 planet placolor">Total estimé : <span>`+shoppingCart.totalCart()+`</span>€
                    </div>
                </div>
                </div>
            </div>

            <div class="col-1"></div>

        </div>
    </div>
    </div>`;
    var panier_vide = `<!-- panier -->
    <div class="contaner-fluid">
        <div class="row h-100 justify-content-center m-0" id="panier-bg">
            <div class="col">
                <div class="text-center text-white">
                    <p class="planet votpan">VOTRE PANIER</p>
                </div>
                <img id="nuage" src="images/nuage.svg">
            </div>
        </div>
        <div class="row gap-3" id="panieroz">
            <div class="col-12 pan_vide">
                <div id="pan_null">
                    <img src="images/triste_1.png" alt="bonhome trise" width="5%">
                </div>
                <div id="pan_null1" class="planet">
                    <h2>votre panier est vide !</h2>
                </div>
                <div id="vide_btn">
                    <button class="btn h3a m-0 btnvide px-3">retour à l'accueil</button>
                </div>
            </div>
        </div>
    </div>`;
    var p2 = document.getElementById("vide");
    if (shoppingCart.totalCount() == 0) {
        // Add the class .open and show the menu
        p2.insertAdjacentHTML('afterbegin', panier_vide);
    } else {
        // Add the class .open and show the menu
        p2.insertAdjacentHTML('afterbegin', panier);
    }
    console.log(shoppingCart.totalCount())
}

$(document).ready(pan_count())

