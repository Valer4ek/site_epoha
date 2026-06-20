const burgerBtn =
  document.getElementById("burgerBtn");

const mobileMenu =
  document.getElementById("mobileMenu");

burgerBtn.addEventListener("click", () => {

  mobileMenu.classList.toggle("active");

});

const orderBtn =
  document.querySelector(".oplata-btn");

if (orderBtn) {

  orderBtn.addEventListener(
    "click",
    () => {

      Swal.fire({
        icon: "success",
        title: "Заказ оформлен!",
        text: "Спасибо за покупку.",
        confirmButtonText: "ОК",
        confirmButtonColor: "#74070D",
        background: "#120305",
        color: "#F0E5C2"
      });

    }
  );

}