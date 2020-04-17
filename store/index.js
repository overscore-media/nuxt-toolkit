export const state = () => ({
  blogPosts: []
})

export const mutations = {
  SET_POSTS (state, data) {
    state.blogPosts = data
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('getTutorials')
  },

  async getTutorials ({ state, commit }) {
    const postMetadata = await require.context('~/blog/data', false, /\.json$/)

    const tutorialsList = await postMetadata.keys().map(key => ({
      ...postMetadata(key)
    }))

    commit('SET_POSTS', tutorialsList)
  }
}
