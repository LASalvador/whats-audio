function changeSpeed(speed) {
    const audios = document.querySelectorAll('audio');
    audios.forEach((audio) => {
        audio.playbackRate = speed;
    })
}

function advanceAudio(audio) {
    audio.currentTime = audio.currentTime + 0.10
}

function delayAudio(audio) {
    audio.currentTime = audio.currentTime - 0.10
}

function updateAudioView(audio) {
    const divPai = audio.parentElement.parentElement.parentElement
    divBotao = divPai.firstChild

    divBotao.classList = {}
    divBotao.classList.add('div_buttons')
    // botão de + 10s
    var b = document.createElement('button')
    b.innerHTML = '+10s'
    b.classList.add('time_button')
    divBotao.append(b)
    // botão de -10s
    var b1 = document.createElement('button')
    b1.innerHTML = '-10s'
    b1.classList.add('time_button')
    divBotao.prepend(b1)
}

const interval = setInterval(() => {
    const header = document.querySelector('header')
    if (header) {
        clearInterval(interval)

        const profilePhoto = header.firstChild
        const speeds = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5,3]
        const select = document.createElement('select')
        select.classList.add('select_speed')
        speeds.forEach(speed => {
            const option = document.createElement('option')
            option.innerHTML = speed + "x"
            option.value = speed
            select.appendChild(option)
        })

        select.addEventListener("change", (event) => {
            changeSpeed(event.target.value)
            window.localStorage.setItem('speed', event.target.value)
        })

        if (window.localStorage.getItem('speed')) {
            select.value = window.localStorage.getItem('speed').toString()
        }

        profilePhoto.after(select)
    }
})

const callback = function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const speed = window.localStorage.getItem('speed') || 1
            changeSpeed(speed)
        }
    }
}

const observer = new MutationObserver(callback);

function createMutationMessages() {
    const div = document.querySelector("#main")

    if (div) {
        const divChat = div.children["4"]
        const divChatF1 = divChat.children["0"]
        var divChatF2 = divChatF1.children["2"]
        var divConversas = divChatF2.children["2"]
        if (divConversas) {
            const config = {
                attributes: true,
                childList: true,
                subtree: true
            };
            observer.observe(divConversas, config);
        }    
    }
}

const chatMutation = setInterval(() => {
    const app = document.querySelector('#pane-side');
    if (app) {
        clearInterval(chatMutation)
        app.addEventListener('click', function () {
            observer.disconnect()
            createMutationMessages()
        })
    }
})
