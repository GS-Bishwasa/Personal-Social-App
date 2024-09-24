let video = document.getElementById("video_player")
let currentuser = sessionStorage.getItem("user")
let play_btn = document.getElementById("play_btn")

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {

        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

play_btn.onclick = function () {
    if (play_btn.className == "fa fa-play-circle") {
        video.play()
        play_btn.className = "fa fa-pause-circle"
    } else if (play_btn.className == "fa fa-pause-circle") {
        video.pause()
        play_btn.className = "fa fa-play-circle"
    }
}

//Progress bar coding
video.ontimeupdate = function () {
    let progress_bar = document.getElementById("progress_bar")
    let t_duration = this.duration
    let c_duration = this.currentTime
    let v_timing = document.getElementById("v_timing")
    v_timing.innerHTML = `${secondsToMinutesSeconds(c_duration)} / ${secondsToMinutesSeconds(t_duration)}`
    let slide_per = parseInt(c_duration * 100 / t_duration)
    progress_bar.style.width = slide_per + "%"

    if (t_duration == c_duration) {
        play_btn.className = "fa fa-play-circle"
    }
}



//Open close add box coding
let open_box_btn = document.getElementById("open_video_box_btn")
open_box_btn.onclick = function () {
    let add_video_box = document.getElementById("add_video_box")
    if (open_box_btn.className == "fa fa-plus-circle") {
        add_video_box.style.display = "block"
        open_box_btn.className = "fa fa-times-circle"
    } else if (open_box_btn.className == "fa fa-times-circle") {
        add_video_box.style.display = "none"
        open_box_btn.className = "fa fa-plus-circle"
    }
}

//Add video in local storage
let add_video_btn = document.getElementById("add_video_btn")
add_video_btn.onclick = function () {
    let v_name = document.getElementById("video_name")
    let v_link = document.getElementById("video_link")

    if (v_name.value != "" && v_link.value != "") {
        let video_obj = {
            name: v_name.value,
            link: v_link.value
        }

        let v_txt = JSON.stringify(video_obj)
        localStorage.setItem(currentuser + "video" + v_name.value, v_txt)
    } else {

    }

}

//Fetch all videos from localstorage
function loadvideo() {

    for (let i = 0; i < localStorage.length; i++) {
        let all_keys = localStorage.key(i)
        if (all_keys.match(sessionStorage.getItem("user")+"video")) {
            let v_data = localStorage.getItem(all_keys)
            let video_object = JSON.parse(v_data)
            let bottom = document.getElementById("bottom")
            bottom.innerHTML += `<div  id="main_video_box">
    <p class="p_v_name" id="playlist_video_name">${video_object.name}</p>
    <button data-url="${video_object.link}" class="v_play_btn" type="button" id="video_play_btn">Play</button><button class="delete_btn" type="button" id="video_delete_btn">Delete</button>
</div>`
        }
    }
}
loadvideo()


// onclick video play button coding
function playvideo() {
    let all_v_play_btn = document.getElementsByClassName("v_play_btn")
    for (let i = 0; i < all_v_play_btn.length; i++) {
        all_v_play_btn[i].onclick = function () {
            clear()
            this.innerHTML = "Playing..."
            let v_url = this.getAttribute("data-url")
            let src_tag = document.getElementById("video_src")
            src_tag.setAttribute("src", v_url)
            video.load()
            video.play()
            play_btn.className = "fa fa-pause-circle"
        }

    }

}
playvideo()

function clear() {
    let all_v_play_btn = document.getElementsByClassName("v_play_btn")
    for (let i = 0; i < all_v_play_btn.length; i++) {
        all_v_play_btn[i].innerHTML = "play"


    }
}

//Next button coding
function next_button() {
    let next_btn = document.getElementById("right_btn")
    next_btn.onclick = function () {
        let all_v_play_btn = document.getElementsByClassName("v_play_btn")
        for (let i = 0; i < all_v_play_btn.length; i++) {
            if (all_v_play_btn[i].innerHTML == "Playing...") {
                let next_element = all_v_play_btn[i].parentElement.nextSibling
                let next_play_btn = next_element.getElementsByClassName("v_play_btn")[0]
                next_play_btn.click()
                return false
            }
        }
    }
}
next_button()


//Previous button coding
function previous_button() {
    let prev_btn = document.getElementById("left_btn")
    prev_btn.onclick = function () {
        let all_v_play_btn = document.getElementsByClassName("v_play_btn")
        for (let i = 0; i < all_v_play_btn.length; i++) {
            if (all_v_play_btn[i].innerHTML == "Playing...") {
                let prev_element = all_v_play_btn[i].parentElement.previousSibling
                let prev_play_btn = prev_element.getElementsByClassName("v_play_btn")[0]
                prev_play_btn.click()
                return false
            }
        }
    }
}
previous_button()


//Delete button coding
function delete_button() {
    let all_delete_btn = document.getElementsByClassName("delete_btn")
    for (let i = 0; i < all_delete_btn.length; i++) {
        all_delete_btn[i].onclick = function () {
            let parent = all_delete_btn[i].parentElement
            let a = parent.getElementsByTagName("P")[0]

            localStorage.removeItem(currentuser + "video" + a.innerHTML)
            parent.className = "animate__animated animate__bounceOut"
            setTimeout(() => {
                parent.remove()

            }, 900);
            let all_v_play_btn = document.getElementsByClassName("v_play_btn")
            let prev_element = all_v_play_btn[0].parentElement
            let prev_play_btn = prev_element.getElementsByClassName("v_play_btn")[0]
            prev_play_btn.click()
        }

    }
}
delete_button()

//Volume Coding
function volume() {
    let volume_icon = document.getElementById("volume")
    volume_icon.onclick = function () {
        let vol_control = document.getElementById("volume_control")
        if (vol_control.style.display == "none") {
            vol_control.style.display = "block"
            vol_control.oninput = function () {
                video.volume = this.value
            }
        } else {
            vol_control.style.display = "none"
        }
    }

}
volume()



//Progress bar functionality coding
let p_box = document.getElementById("progress_box")
p_box.onclick = function (event) {
    //event.offsetX ---> It gives the width of the progress box
    let per = event.offsetX/this.offsetWidth
    video.currentTime = per*video.duration
}

//Fullscreen coding
let full_screen  = document.getElementById("full_screen")
full_screen.onclick = function(){
    video.requestFullscreen()
}


//Speed Coding
function speed() {
    let speed_icon = document.getElementById("speed")
    speed_icon.onclick = function () {
        let spd_vontrol = document.getElementById("speed_control")
        if (spd_vontrol.style.display == "none") {
            spd_vontrol.style.display = "block"
            spd_vontrol.oninput = function () {
                video.playbackRate = this.value
            }
        } else {
            spd_vontrol.style.display = "none"
        }
    }

}
speed()


//Search box coding
let search = document.getElementById("search")
search.oninput = function() {
    let all_v_name = document.getElementsByClassName("p_v_name")
    for (let i = 0; i < all_v_name.length; i++) {
        if(all_v_name[i].innerHTML.toLowerCase().match(search.value.toLowerCase())){
            all_v_name[i].parentElement.style.display = "block"
        }else{
            all_v_name[i].parentElement.style.display = "none"
        }
        
    }
}