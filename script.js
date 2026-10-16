/* =====================================================
   YING DRINK - SCRIPT
   ===================================================== */


/* ================= CHẠY KHI TRANG LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {

    setupRegister();

    setupLogin();

    setupFeedback();

    setupHomeSearch();

    setupProducts();

    updateUserDisplay();

    setActiveMenu();

});


/* =====================================================
   HÀM CHUẨN HÓA TIẾNG VIỆT
   Giúp tìm "tra sua" vẫn ra "Trà sữa"
   ===================================================== */

function normalizeText(text) {

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}


/* =====================================================
   HIỂN THỊ NGƯỜI DÙNG
   ===================================================== */

function updateUserDisplay() {

    const userArea = document.getElementById("userArea");

    if (!userArea) {
        return;
    }


    const user = JSON.parse(
        localStorage.getItem("yingUser")
    );

    const loggedIn =
        localStorage.getItem("yingLoggedIn") === "true";


    if (loggedIn && user) {

        userArea.innerHTML = `
            <span>Xin chào, ${escapeHTML(user.name)}</span>

            <a href="#" id="logoutBtn">
                Đăng xuất
            </a>
        `;


        const logoutBtn =
            document.getElementById("logoutBtn");


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    localStorage.removeItem(
                        "yingLoggedIn"
                    );

                    window.location.href =
                        "index.html";

                }
            );

        }

    } else {

        userArea.innerHTML = `
            <a href="dang-nhap.html">
                Đăng nhập
            </a>

            <a href="dang-ky.html">
                Đăng ký
            </a>
        `;

    }

}


/* =====================================================
   ĐĂNG KÝ
   ===================================================== */

function setupRegister() {

    const form =
        document.getElementById("registerForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("registerName").value.trim();

            const email =
                document.getElementById("registerEmail").value.trim();

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("registerConfirm").value;


            if (
                !name ||
                !email ||
                !password
            ) {

                alert(
                    "Vui lòng nhập đầy đủ thông tin."
                );

                return;

            }


            if (password !== confirmPassword) {

                alert(
                    "Mật khẩu nhập lại không giống nhau."
                );

                return;

            }


            const user = {
                name: name,
                email: email,
                password: password
            };


            localStorage.setItem(
                "yingUser",
                JSON.stringify(user)
            );


            alert(
                "Đăng ký thành công!"
            );


            window.location.href =
                "dang-nhap.html";

        }
    );

}


/* =====================================================
   ĐĂNG NHẬP
   ===================================================== */

function setupLogin() {

    const form =
        document.getElementById("loginForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;


            const user = JSON.parse(
                localStorage.getItem("yingUser")
            );


            if (!user) {

                alert(
                    "Chưa có tài khoản. Vui lòng đăng ký trước."
                );

                return;

            }


            if (
                email === user.email &&
                password === user.password
            ) {

                localStorage.setItem(
                    "yingLoggedIn",
                    "true"
                );


                alert(
                    "Đăng nhập thành công!"
                );


                window.location.href =
                    "index.html";

            } else {

                alert(
                    "Email hoặc mật khẩu không đúng."
                );

            }

        }
    );

}


/* =====================================================
   GÓP Ý
   ===================================================== */

function setupFeedback() {

    const form =
        document.querySelector(".feedback-form");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const subject =
                document.getElementById("subject")?.value.trim();

            const message =
                document.getElementById("message")?.value.trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                alert(
                    "Vui lòng nhập đầy đủ thông tin."
                );

                return;

            }


            const feedbacks =
                JSON.parse(
                    localStorage.getItem(
                        "yingFeedbacks"
                    )
                ) || [];


            feedbacks.push({

                name: name,

                email: email,

                subject: subject,

                message: message,

                time:
                    new Date().toLocaleString(
                        "vi-VN"
                    )

            });


            localStorage.setItem(
                "yingFeedbacks",
                JSON.stringify(feedbacks)
            );


            alert(
                "Cảm ơn bạn đã gửi góp ý!"
            );


            form.reset();

        }
    );

}


/* =====================================================
   TÌM KIẾM TỪ TRANG CHỦ
   ===================================================== */

function setupHomeSearch() {

    const form =
        document.getElementById(
            "homeSearchForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "homeSearch"
                );


            if (!input) {
                return;
            }


            const keyword =
                input.value.trim();


            if (!keyword) {

                alert(
                    "Vui lòng nhập sản phẩm muốn tìm."
                );

                return;

            }


            window.location.href =
                "san-pham.html?search=" +
                encodeURIComponent(keyword);

        }
    );

}


/* =====================================================
   SẢN PHẨM
   ===================================================== */

function setupProducts() {

    const productList =
        document.getElementById(
            "productList"
        );


    if (!productList) {
        return;
    }


    /* -----------------------------
       XỬ LÝ TÌM KIẾM
       ----------------------------- */

    const searchForm =
        document.getElementById(
            "productSearchForm"
        );


    const searchInput =
        document.getElementById(
            "productSearch"
        );


    if (searchForm && searchInput) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                filterProducts(
                    searchInput.value
                );

            }
        );


        searchInput.addEventListener(
            "input",
            function () {

                filterProducts(
                    searchInput.value
                );

            }
        );

    }


    /* -----------------------------
       LẤY TỪ KHÓA TỪ TRANG CHỦ
       ----------------------------- */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const search =
        params.get("search");


    if (search && searchInput) {

        searchInput.value = search;

        filterProducts(search);

    }


    /* -----------------------------
       NÚT THÊM GIỎ HÀNG
       ----------------------------- */

    const addButtons =
        document.querySelectorAll(
            ".add-to-cart"
        );


    addButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        button.dataset.id;

                    const name =
                        button.dataset.name;

                    const price =
                        Number(
                            button.dataset.price
                        );


                    addToCart(
                        id,
                        name,
                        price
                    );

                }
            );

        }
    );


    /* -----------------------------
       HIỂN THỊ GIỎ HÀNG
       ----------------------------- */

    renderCart();


    /* -----------------------------
       XÓA GIỎ HÀNG
       ----------------------------- */

    const clearButton =
        document.getElementById(
            "clearCart"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();


                if (cart.length === 0) {

                    alert(
                        "Giỏ hàng đang trống."
                    );

                    return;

                }


                if (
                    confirm(
                        "Bạn có chắc muốn xóa toàn bộ giỏ hàng?"
                    )
                ) {

                    localStorage.removeItem(
                        "yingCart"
                    );

                    renderCart();

                }

            }
        );

    }


    /* -----------------------------
       ĐẶT HÀNG
       ----------------------------- */

    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();


                if (cart.length === 0) {

                    alert(
                        "Bạn chưa chọn sản phẩm."
                    );

                    return;

                }


                const total =
                    calculateTotal(cart);


                alert(
                    "Đặt hàng thành công!\n\n" +
                    "Tổng tiền: " +
                    formatMoney(total) +
                    "\n\nCảm ơn bạn đã mua hàng tại YING DRINK!"
                );


                localStorage.removeItem(
                    "yingCart"
                );


                renderCart();

            }
        );

    }

}


/* =====================================================
   TÌM KIẾM SẢN PHẨM
   ===================================================== */

function filterProducts(keyword) {

    const products =
        document.querySelectorAll(
            ".product"
        );


    const message =
        document.getElementById(
            "productSearchMessage"
        );


    const noProduct =
        document.getElementById(
            "noProduct"
        );


    const count =
        document.getElementById(
            "productCount"
        );


    const search =
        normalizeText(keyword);


    let found = 0;


    products.forEach(
        function (product) {

            const name =
                normalizeText(
                    product.dataset.name || ""
                );


            const category =
                normalizeText(
                    product.dataset.category || ""
                );


            const content =
                normalizeText(
                    product.innerText
                );


            const match =
                !search ||
                name.includes(search) ||
                category.includes(search) ||
                content.includes(search);


            if (match) {

                product.style.display =
                    "";

                found++;

            } else {

                product.style.display =
                    "none";

            }

        }
    );


    /* SỐ LƯỢNG */

    if (count) {

        count.textContent =
            found +
            " sản phẩm";

    }


    /* THÔNG BÁO */

    if (search && message) {

        message.textContent =
            "Đang tìm kiếm: " +
            keyword;

    } else if (message) {

        message.textContent = "";

    }


    /* KHÔNG CÓ */

    if (noProduct) {

        if (found === 0) {

            noProduct.style.display =
                "block";

        } else {

            noProduct.style.display =
                "none";

        }

    }

}


/* =====================================================
   LẤY GIỎ HÀNG
   ===================================================== */

function getCart() {

    return JSON.parse(
        localStorage.getItem(
            "yingCart"
        )
    ) || [];

}


/* =====================================================
   LƯU GIỎ HÀNG
   ===================================================== */

function saveCart(cart) {

    localStorage.setItem(
        "yingCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   THÊM SẢN PHẨM VÀO GIỎ
   ===================================================== */

function addToCart(
    id,
    name,
    price
) {

    const cart =
        getCart();


    const existing =
        cart.find(
            function (item) {

                return item.id === id;

            }
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: id,

            name: name,

            price: price,

            quantity: 1

        });

    }


    saveCart(cart);


    renderCart();


    alert(
        "Đã thêm " +
        name +
        " vào giỏ hàng!"
    );

}


/* =====================================================
   HIỂN THỊ GIỎ HÀNG
   ===================================================== */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (!cartItems) {
        return;
    }


    const cart =
        getCart();


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    /* GIỎ TRỐNG */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒 Giỏ hàng đang trống.
            </div>
        `;


        if (cartCount) {

            cartCount.textContent =
                "0 sản phẩm";

        }


        if (cartTotal) {

            cartTotal.textContent =
                "0đ";

        }


        return;

    }


    /* HIỂN THỊ */

    cartItems.innerHTML =
        cart.map(
            function (item) {

                return `

                    <div class="cart-item">

                        <div class="cart-item-info">

                            <h3>
                                ${escapeHTML(item.name)}
                            </h3>

                            <p>
                                ${formatMoney(item.price)}
                            </p>

                        </div>


                        <div class="cart-controls">

                            <button
                                class="quantity-button"
                                onclick="changeQuantity('${item.id}', -1)">
                                −
                            </button>


                            <span class="quantity">
                                ${item.quantity}
                            </span>


                            <button
                                class="quantity-button"
                                onclick="changeQuantity('${item.id}', 1)">
                                +
                            </button>


                            <button
                                class="remove-item"
                                onclick="removeFromCart('${item.id}')"
                                title="Xóa sản phẩm">
                                ✕
                            </button>

                        </div>


                        <strong>
                            ${formatMoney(
                                item.price *
                                item.quantity
                            )}
                        </strong>

                    </div>

                `;

            }
        ).join("");


    /* TỔNG SỐ LƯỢNG */

    const totalQuantity =
        cart.reduce(
            function (total, item) {

                return total +
                    item.quantity;

            },
            0
        );


    /* TỔNG TIỀN */

    const total =
        calculateTotal(cart);


    if (cartCount) {

        cartCount.textContent =
            totalQuantity +
            " sản phẩm";

    }


    if (cartTotal) {

        cartTotal.textContent =
            formatMoney(total);

    }

}


/* =====================================================
   TĂNG / GIẢM SỐ LƯỢNG
   ===================================================== */

function changeQuantity(
    id,
    amount
) {

    const cart =
        getCart();


    const item =
        cart.find(
            function (product) {

                return product.id === id;

            }
        );


    if (!item) {
        return;
    }


    item.quantity += amount;


    /* Nếu số lượng <= 0 thì xóa */

    if (item.quantity <= 0) {

        const index =
            cart.indexOf(item);

        cart.splice(index, 1);

    }


    saveCart(cart);


    renderCart();

}


/* =====================================================
   XÓA MỘT SẢN PHẨM
   ===================================================== */

function removeFromCart(id) {

    let cart =
        getCart();


    cart =
        cart.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveCart(cart);


    renderCart();

}


/* =====================================================
   TÍNH TỔNG TIỀN
   ===================================================== */

function calculateTotal(cart) {

    return cart.reduce(
        function (total, item) {

            return total +
                item.price *
                item.quantity;

        },
        0
    );

}


/* =====================================================
   FORMAT TIỀN VIỆT NAM
   ===================================================== */

function formatMoney(number) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(number) + "đ";

}


/* =====================================================
   MENU ACTIVE
   ===================================================== */

function setActiveMenu() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const links =
        document.querySelectorAll(
            ".nav a"
        );


    links.forEach(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
   CHỐNG HTML LỖI KHI HIỂN THỊ TÊN
   ===================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}