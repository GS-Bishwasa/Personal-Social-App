let submit1 = document.getElementById("form1")
submit1.onsubmit = function() {

    let email = document.getElementById("email")
    let passwordd = document.getElementById("pass")
    let small1 = document.getElementById("small1")
    let small3 = document.getElementById("small2")

    if (localStorage.getItem(btoa(email.value)) == null) {
        small1.style.display = "block"
        email.style.borderBottomColor = "red"
        email.onclick = function() {
            small1.style.display = "none"
            email.style.borderBottomColor = "#ccc"
            email.value = ""
        }


    } else {

        let email_data = localStorage.getItem(btoa(email.value))
        let object_data = JSON.parse(email_data)
        let correct_email = object_data.email
        let correct_password = object_data.password

        if (btoa(email.value) == correct_email) {
            if (btoa(passwordd.value) == correct_password) {
                    sessionStorage.setItem("user", btoa(email.value))
                   location.replace("profile/index.html")
                
            } else {
                small3.style.display = "block"
                passwordd.style.borderBottomColor = "red"
                passwordd.onclick = function() {
                    small3.style.display = "none"
                    passwordd.style.borderBottomColor = "#ccc"
                    passwordd.value = ""
                }
            }
        }

    }

    return false;
}