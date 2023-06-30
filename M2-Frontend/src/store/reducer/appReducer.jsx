import actionTypes from "../action/actionTypes";
const initState = {
    banner: [],
    melody: {},
    chill: {},
    energy: {},
    top100: {},
    hot: {},
    isLoading: false,
    newRelease: {},
    weekChart: [],
    chart: {},
    rank: [],
    hotTop: {},
    vnTop: {},
    asiaTop: {},
    euroTop: {},
    classicTop: {},
    dataTop: {},
    currentWidth: null,
}
const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            // console.log(action);
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                melody: action.homeData?.find(item => item.sectionId === "hSeasonTheme") || {},
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                energy: action.homeData?.find(item => item.sectionId === 'hEditorTheme2') || {},
                top100: action.homeData?.find(item => item.sectionId === "h100") || {},
                hot: action.homeData?.find(item => item.sectionId === "hAlbum") || {},
                newRelease: action.homeData?.find(item => item.sectionType === "new-release") || {},
                weekChart: action.homeData?.find(item => item.sectionType === "weekChart")?.items || [],
                chart: action.homeData?.find(item => item.sectionId === "hZC")?.chart || {},
                rank: action.homeData?.find(item => item.sectionId === "hZC")?.items || [],

            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag
            }
        case actionTypes.CURRENT_WIDTH:
            return {
                ...state,
                currentWidth: action.wid
            }
        case actionTypes.GET_TOP100:
            // console.log('action', action);
            return {
                ...state,
                dataTop: action.topData || {},
                hotTop: action.topData?.find(item => item.title === "Nổi bật").items || {},
                vnTop: action.topData?.find(item => item.title === "Nhạc Việt Nam").items || {},
                asiaTop: action.topData?.find(item => item.title === "Nhạc Châu Á").items || {},
                euroTop: action.topData?.find(item => item.title === "Nhạc Âu Mỹ").items || {},
                classicTop: action.topData?.find(item => item.title === "Nhạc Hòa Tấu").items || {},
            }
        default:
            return state
    }
}
export default appReducer;