import {
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,

  SET_POST_LOADING,
  REMOVE_POST_LOADING,

  RESET_POST_STATUS,
} from './types'

export const new_post = (title, thumbnail, body, category, slug) => async (dispatch) => {
  dispatch({
    type:SET_POST_LOADING,
  })

  const formData = new FormData()
  formData.append('title', title)
  formData.append('body', body)
  formData.append('thumbnail', thumbnail)
  formData.append('category', category)
  formData.append('slug', slug)

  try {
    const res = await fetch(`/posts/create`, {
      method: 'GET',
    })
    const data = await res.json()

    const res2 = await fetch(`/posts/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.access}`,
      },
      body: formData,
    })
    if (res2.status === 201) {
      dispatch({
        type:NEW_POST_SUCCESS,
      })
    } else {
      dispatch({
        type:NEW_POST_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: NEW_POST_FAIL,
    })
  }

  dispatch({
    type:REMOVE_POST_LOADING,
  })
}
export const reset_post_status = () => (dispatch) => {
  dispatch({
    type:RESET_POST_STATUS,
  })
}