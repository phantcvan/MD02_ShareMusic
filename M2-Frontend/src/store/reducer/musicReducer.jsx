import actionTypes from "../action/actionTypes";
const initState = {
    curSongId: null,
    curSongData: null,
    isPlaying: false,
    songs: null,
    atAlbum: false,
    curAlbumId: null,
    recentSongs: [],
    favoriteSongs: [],
    users: [],
    userNow: null,
    searchData: {},
    keyword: "",

}
const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs || null
            }
        case actionTypes.AT_ALBUM:
            return {
                ...state,
                atAlbum: action.flag
            }
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null
            }
        case actionTypes.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.pid || null
            }
        case actionTypes.SET_FAVOR:
            if (action.data) {
                let songs = state.favoriteSongs
                let user = action.data.userNow
                if (!user || !action.data.sid) {
                    return state;
                  }
                const otherUserState = songs.filter((obj) => obj.userNow !== user);
                let filterUserState = songs.filter(obj => obj.userNow === user);
                if (filterUserState.length > 0) {
                    filterUserState = filterUserState.filter(i => i.sid !== action.data.sid);
                }
                songs = [action.data, ...otherUserState, ...filterUserState];
                return {
                    ...state,
                    favoriteSongs: songs
                }
            }
        case actionTypes.SET_RECENT:
            if (action.data) {
                let songs = state.recentSongs
                let user = action.data.userNow
                const otherUserState = songs.filter((obj) => obj.userNow !== user);
                let filterUserState = songs.filter(obj => obj.userNow === user);
                if (filterUserState.length > 0) {
                    filterUserState = filterUserState.filter(i => i.sid !== action.data.sid);
                }
                const userCount = filterUserState.length;
                let songUser = filterUserState;
                if (userCount >= 9) {
                    songUser = filterUserState.filter((i, index, self) => index != self.length - 1);
                }
                songs = [action.data, ...otherUserState, ...songUser];

                return {
                    ...state,
                    recentSongs: songs
                }

            }
        case actionTypes.DELETE_RECENT:
            console.log("action", action.id);
            return {
                ...state,
                recentSongs: state.recentSongs.filter((obj) => obj.sid !== action.id)
            }
        case actionTypes.SEARCH:
            return {
                ...state,
                searchData: action.data || {},
                keyword: action.keyword || ''
            }
        // USER
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case actionTypes.UPDATE_USER:
            const username = action.username
            const level = action.level
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.username === username) {
                        return { ...user, level };
                    } else {
                        return user;
                    }
                })
            }
        case actionTypes.UPDATE_PASSWORD:
            const usernameP = action.username
            const password = action.password
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.username === usernameP) {
                        return { ...user, password };
                    } else {
                        return user;
                    }
                })
            }
        case actionTypes.UPDATE_AVATAR:
            const usernameV = action.username
            const avatarURL = action.avatarURL
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.username === usernameV) {
                        return { ...user, avatarURL };
                    } else {
                        return user;
                    }
                })
            }
        case actionTypes.SET_USER_NOW:
            return {
                ...state,
                userNow: action.userNow || null
            }
        default:
            return state
    }
}
export default musicReducer;