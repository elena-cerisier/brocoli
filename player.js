export const PLAYER_MIN = 1
export const PLAYER_MAX = 120

const tracks = []
let imageIndex = 0
let trackIndex = 0

export const getPlayerImageIndex = () => imageIndex
export const getPlayerTrackIndex = () => trackIndex

/** @type {HTMLImageElement} */
const img = document.querySelector('img.player')

const buildUrl = (imageIndex, trackIndex) => {
    const image = imageIndex.toString().padStart(4, '0')
    const track = tracks[trackIndex]
    const url = `images/${track}/${image}.png`
    return url
}

const preload = (trackIndex) => {
    for (let i = PLAYER_MIN; i <= PLAYER_MAX; i++) {
        const img = document.createElement('img')
        img.classList.add('preload')
        const url = buildUrl(i, trackIndex)
        img.src = url
        document.body.append(img)
    }
}

/**
 * 
 * @param {string[]} initTracks 
 */
export const initPlayer = (initTracks) => {
    tracks.push(...initTracks)
    for (let i = 0; i < tracks.length; i++) {
        preload(i)
    }
}

/**
 * Met à jour le player.
 * @param {{ imageIndex: number, trackIndex: number }} param0
 * @returns 
 */
export const updatePlayer = ({
    imageIndex: newImageIndex = imageIndex, 
    trackIndex: newTrackIndex = trackIndex,
}) => {
    
    if (newImageIndex === imageIndex && newTrackIndex === trackIndex) {
        return
    }

    imageIndex = newImageIndex
    trackIndex = newTrackIndex

    img.src = buildUrl(imageIndex, trackIndex)
}


export const nextTrack = () => {
    let newTrackIndex = trackIndex + 1
    if (newTrackIndex === tracks.length) {
        newTrackIndex = 0
    }
    updatePlayer({
        trackIndex: newTrackIndex,
    })
}

export const previousTrack = () => {
    let newTrackIndex = trackIndex - 1
    if (newTrackIndex === -1) {
        newTrackIndex = tracks.length - 1
    }
    updatePlayer({
        trackIndex: newTrackIndex,
    })
}

Object.assign(window, {
    updatePlayer,
})


