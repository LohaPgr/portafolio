export default function form() {
    const $forms = document.querySelector(".contact-form"),
        $inputs = document.querySelectorAll(".contact-form [required]");

      $inputs.forEach((el) => {
        let $span = document.createElement("span");
        $span.id = el.name;
        $span.textContent = el.title;
        $span.classList.add("form-error", "none");
        el.insertAdjacentElement("afterend", $span);
      });

      document.addEventListener("keyup", (e) => {
        if (e.target.matches(".contact-form [required]")) {
          let $input = e.target,
            $pattern = $input.pattern || $input.dataset.pattern;
          console.log(e.target.name.classList);

          if ($pattern && $input.value !== "") {
            console.log("el input tiene patrons");

            let regexp = new RegExp($pattern);
            return !regexp.exec($input.value)
              ? document.getElementById($input.name).classList.add("is-active")
              : document
                  .getElementById($input.name)
                  .classList.remove("is-active");
          }
          if (!$pattern) {
            return $input.value === ""
              ? document.getElementById($input.name).classList.add("is-active")
              : document
                  .getElementById($input.name)
                  .classList.remove("is-active");
          }
        }
      });

      document.addEventListener("submit", (e) => {
        const $loader = document.querySelector(".form-loader"),
          $respuesta = document.querySelector(".form-respuesta");

        $loader.classList.remove("none");

        setTimeout(() => {
          $loader.classList.add("none");
          $respuesta.classList.remove("none");
          $forms.reset();

          setTimeout(() => $respuesta.classList.add("none"), 2000);
        }, 2000);
      });
}