if (sessionStorage.getItem("user") == null) {
    window.location.replace("../../../index.html")
} else {
    let current_user = sessionStorage.getItem("user")
    //Image Load
    window.onload = function () {
        let user_email = sessionStorage.getItem("user")
        let img_url = localStorage.getItem(user_email + "image")
        let profile_pic = document.getElementById("profile_pic")
        profile_pic.style.backgroundImage = "url(" + img_url + ")"
        profile_pic.style.backgroundSize = "cover"
        profile_pic.style.backgroundPosition = "center"
    }
    // Plus Icon
    let new_contact = document.getElementById("new_contact")
    new_contact.onclick = function () {
        let contact_bg = document.getElementById("contact_bg")
        contact_bg.style.display = "block"
    }

    //Close Button
    let close = document.getElementById("close")
    close.onclick = function () {
        contact_bg.style.display = "none"
    }
    //Add Button
    let add = document.getElementById("add")
    add.onclick = function () {
        let c_name = document.getElementById("c_name")
        let c_number = document.getElementById("c_number")
        if (c_name.value != "" && c_number.value != "") {
            let new_contact = {
                name: c_name.value,
                number: c_number.value
            }
            let json_text = JSON.stringify(new_contact)
            localStorage.setItem(current_user + "_contact" + c_name.value, json_text)
        } else {
            // alert("Please Enter Name And Phone No.")
            c_name.style.borderColor = "red"
            c_number.style.borderColor = "red"
            let small10 = document.getElementById("small10")
            small10.style.color = "red"
            small10.innerHTML = "*Please Enter Name And Phone No."
            return false
        }
    }

    //localStorage.length //give the number of keys saved in the local storage
    //localStorage.key(0) //Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.


    //Add Contact Functionality
    function all_contact() {
        for (let i = 0; i < localStorage.length; i++) {
            let all_keys = localStorage.key(i)
            if (all_keys.match(sessionStorage.getItem("user") + "_contact")) {
                let json_txt = localStorage.getItem(all_keys)
                let obj = JSON.parse(json_txt)
                let all_contact_box = document.getElementById("all_contact_box")
                all_contact_box.innerHTML += `<div id="contact" >
                <p class="contact_name"><i class="fas fa-user"></i> ${obj.name}</p>
                <div id="tool">
                    <i class="fas fa-edit edit"></i>
                    <i class="fas fa-trash del"></i>
                </div>
                <hr color="black" width="75%" size="1px">
                <p class="contact_number"><i class="fas fa-mobile-alt"></i> ${obj.number}</p>
            </div>`
            }

        }
    }
    all_contact()


    //Search Functionality
    let search = document.getElementById("search")
    search.oninput = function () {
        let all_contact_name = document.getElementsByClassName("contact_name")

        for (let i = 0; i < all_contact_name.length; i++) {
            let contact = all_contact_name[i].parentElement

            if (all_contact_name[i].innerHTML.toLowerCase().includes(search.value.toLowerCase())) {
                contact.style.display = "block"
            } else {
                contact.style.display = "none"
            }

        }
    }

    //Delete Functionality
    function del() {
        let del = document.getElementsByClassName("del")
        for (let i = 0; i < del.length; i++) {
            del[i].onclick = function () {
                let parent = this.parentElement.parentElement
                let p_element = parent.getElementsByClassName("contact_name")[0]
                let username = p_element.innerHTML.replace('<i class="fas fa-user"></i>', "")
                localStorage.removeItem(current_user + "_contact" + username.trim())
                parent.className = "animate__animated animate__bounceOut"

                var audio = new Audio('../../../delete.mp3');
                audio.play();
                setTimeout(() => {
                    parent.remove()
                }, 1000);
            }


        }
    }
    del()

    //Edit Functionality
    function edit() {
        let edit_icon = document.getElementsByClassName("edit")
        for (let i = 0; i < edit_icon.length; i++) {
            edit_icon[i].onclick = function () {
                let parent = this.parentElement.parentElement
                let para = parent.getElementsByTagName("P")
                let name = para[0].innerHTML.replace('<i class="fas fa-user"></i>', "").trim()
                let number = para[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>', "").trim()
                let c_name = document.getElementById("c_name")
                let c_number = document.getElementById("c_number")
                let new_contact = document.getElementById("new_contact")
                let h1 = document.getElementById("h1")
                let add = document.getElementById("add")
                let close = document.getElementById("close")
                c_name.value = name
                c_number.value = number
                new_contact.click()
                h1.innerHTML = "Edit Your Contact"
                add.innerHTML = "Edit"
                localStorage.removeItem(current_user + "_contact" + name)
                close.style.display = "none"
            }
        }
    }
    edit()
}