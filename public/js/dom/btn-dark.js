let d = document,
ls = localStorage;
export default function darkTheme(btn, classDark) {
  const $themeBtn = d.querySelector(btn),
    $selectors = d.querySelectorAll("[data-dark]");
  let $li = d.querySelector(`${btn} .bi`);
  console.log($selectors);

  const dark = () => {
    $li.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
    $selectors.forEach((el) => {
      el.classList.add(classDark);
    });
    ls.setItem("theme", "dark");
  };
  const light = () => {
    $li.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
    $selectors.forEach((el) => {
      el.classList.remove(classDark);
    });
    ls.setItem("theme", "light");
  };

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn) || e.target.matches(`${btn} *`)) {
      if ($li.classList.contains("bi-moon-stars-fill")) {
        dark();
      } else {
        light();
      }
      console.log($li.classList);
    }
  });
  d.addEventListener("DOMContentLoaded", e => {
    console.log(ls.getItem("theme"));
    if (ls.getItem("theme") === null) {
        ls.setItem("theme", "light");
    }
    if (ls.getItem("theme") === "light") {
        light();
    }
    if(ls.getItem("theme") === "dark") {
        dark();
    }
  })
}
