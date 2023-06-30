import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const getHome = () => async (dispatch) => {
    try {
        const response = await apis.getHome()

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: response.data.data.items
            })
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: null
        })
    }
}
export const getTop100 = () => async (dispatch) => {
    try {
        const response = await apis.getTop100()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOP100,
                topData: response.data.data
            })
        } else {
            dispatch({
                type: actionTypes.GET_TOP100,
                topData: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            topData: null
        })
    }
}
export const setCurrentWidth = (wid) => ({
    type: actionTypes.CURRENT_WIDTH,
    wid
})
