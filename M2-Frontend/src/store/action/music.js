import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid: sid
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})

export const playAlbum = (flag) => ({
    type: actionTypes.AT_ALBUM,
    flag
})

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})
export const loading = (flag) => ({
    type: actionTypes.LOADING,
    flag
})
export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})
export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid
})

export const setFavorite = (data) => ({
    type: actionTypes.SET_FAVOR,
    data
})
export const setRecent = (data) => ({
    type: actionTypes.SET_RECENT,
    data
})
export const deleteRecent = (id) => ({
    type: actionTypes.DELETE_RECENT,
    id
})
export const search = (keyword) => async (dispatch) => {
    try {
        const response = await apis.apiSearch(keyword)
        if (response.data.err == 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: response.data.data,
                keyword
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null
        })
    }
}
export const getSearchSong = (singerId) => async (dispatch) => {
    try {
        const response = await apis.apiGetArtistSongs(singerId)
        if (response.data.err == 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: response.data.data.items,
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                songs: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            songs: null
        })
    }
}

// Tên User đang đăng nhập
export const setUserNow = (userNow) => ({
    type: actionTypes.SET_USER_NOW,
    userNow
})
// Danh sách User
export const setUsers = (user) => ({
    type: actionTypes.SET_USERS,
    user
})
// Cập nhật level cho user
export const updateUser = (username,level) => ({
    type: actionTypes.UPDATE_USER,
    username, level
})
// Cập nhật mật khẩu
export const updatePassword= (username,password) => ({
    type: actionTypes.UPDATE_PASSWORD,
    username, password
})
// Cập nhật mật khẩu
export const updateAvatar= (username,avatarURL) => ({
    type: actionTypes.UPDATE_AVATAR,
    username, avatarURL
})



