//Sign Up Coading
let submit = document.getElementById("form")
submit.onsubmit = function () {

    let username = btoa(document.getElementById("name").value)
    let email = btoa(document.getElementById("email1").value)
    let number = btoa(document.getElementById("num").value)
    let password1 = btoa(document.getElementById("pass1").value)

    let obj = {
        name: username,
        email: email,
        number: number,
        password: password1
    }

    let f = JSON.stringify(obj)
    if (username != "" && email != "" && number != "" && password1 != "") {

        window.localStorage.setItem(email, f)

        let button = document.getElementById("btn1")
        button.style.background = "#14b129"
        button.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ffffff;"></i>  Sign Up Successfull`

        setTimeout(() => {
            button.style.background = "linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%)"
            button.innerHTML = `Sign Up`
            submit.reset()

        }, 3000);


        return false
    }
}

//Email Validation Coading
let email_update = document.getElementById("email1")
email_update.onchange = function () {

    let email = btoa(document.getElementById("email1").value)
    if (localStorage.getItem(email) != null) {
        let h = document.getElementById("small")
        h.style.display = "block"
        let button = document.getElementById("btn1")
        button.disabled = true
        button.style.background = "#ccc"


        email_update.onclick = function () {
            email_update.value = ""
            h.style.display = "none"
            button.style.background = "linear-gradient(90deg, rgba(182, 0, 242, 1) 0%, rgba(255, 0, 215, 1) 100%)"
            button.disabled = false

        }

        return false
    }
}