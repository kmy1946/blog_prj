import {
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,

  SET_POST_LOADING,
  REMOVE_POST_LOADING,

  RESET_POST_STATUS,
} from '../blog_app/components/actions/types'

const initialState = {
  loading: false,
  new_post_success: false,
}

const postReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case NEW_POST_SUCCESS:
      return {
        ...state,
        new_post_success:true,
      }
    case NEW_POST_FAIL:
      return {
        ...state,
      }
    case SET_POST_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_POST_LOADING:
      return {
        ...state,
        loading: false,
      }
    case RESET_POST_STATUS:
      return {
        ...state,
        new_post_success: false,
      }
    default:
      return state
  }
}
export default postReducer