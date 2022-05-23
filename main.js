import { getPlayerTrackIndex, initPlayer, nextTrack, PLAYER_MAX, PLAYER_MIN, updatePlayer } from './player.js'

const tracks = ['bleu', 'rouge']
initPlayer(tracks)

const audioTracks = [...document.querySelectorAll('audio')]
const captionTracks = [
    'yo ta souris mon gros',
    'yo bouge',
]

/** @type {HTMLInputElement} */
const input = document.querySelector('input[type=range]')
if (input !== null) {
    input.oninput = () => {
        updatePlayer({
            position: input.value,
        })
    }
}

document.onpointermove = event => {
    const ratio = event.y / window.innerHeight
    const index = PLAYER_MIN + Math.floor((1 - ratio) * PLAYER_MAX)
    updatePlayer({ imageIndex: index })
}

document.onkeydown = event => {
    if (event.key === ' ') {
        
        const audioOld =  audioTracks[getPlayerTrackIndex()]
        audioOld.pause()

        nextTrack()

        const audio = audioTracks[getPlayerTrackIndex()]
        audio.play()

        // caption update
        document.querySelector('p.caption').innerHTML = captionTracks[getPlayerTrackIndex()]
    }
}

let fullscreen = false
document.querySelector('.fullscreen-button').onclick = () => {
    if (fullscreen === false) {
        fullscreen = true
        document.body.requestFullscreen()
        
        const audio = audioTracks[getPlayerTrackIndex()]
        audio.play()
    }
    else {
        fullscreen = false
        document.exitFullscreen()
    }
}