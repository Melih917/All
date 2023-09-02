const stars = document.querySelectorAll(".star");

stars.forEach((star) => {
  star.addEventListener("click", (e) => {
    const rating = e.target.getAttribute("data-value");
    document.getElementById("rating").value = rating;
    stars.forEach((s) => {
      if (s.getAttribute("data-value") <= rating) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  });
});
