// firebaseのuserオブジェクトの変更を無視するため、strictモードをfalseにする。
export const strict = false

export const state = () => {
  return {
    user: null,
    diaries: [],
    isLoaded: false
  }
}

export const getters = {
  diariesOrderedByDate: state => {
    return state.diaries.slice().sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
  }
}

export const mutations = {
  setUser(state, { user }) {
    state.user = user || null
  },

  setIsLoaded(state, bool) {
    state.isLoaded = !!bool
  },

  setDiaries(state, { diaries }) {
    state.diaries = Array.isArray(diaries) ? diaries : []
  },

  addDiary(state, { diary }) {
    state.diaries.push(diary)
  },

  updateDiary(state, { diary }) {
    const updateDiary = state.diaries.find(d => d.id === diary.id)

    if (updateDiary) {
      Object.assign(updateDiary, diary)
    }
  },

  removeDiary(state, { diaryId }) {
    const index = state.diaries.findIndex(diary => diary.id === diaryId)
    if (index !== -1) {
      state.diaries.splice(index, 1)
    }
  }
}

export const actions = {
  async fetchDiaries({ state, commit }) {
    const idToken = await state.user.getIdToken()
    this.$axios.setToken(idToken, 'Bearer')

    const diaries = await this.$axios.$get('/diaries')
    commit('setDiaries', { diaries })
  },

  async postNewDiary({ state, commit }, { input }) {
    const idToken = await state.user.getIdToken()
    this.$axios.setToken(idToken, 'Bearer')

    const diary = await this.$axios.$post('/diaries', input)
    commit('addDiary', { diary })
  },

  async updateDiary({ state, commit }, { diaryId, input }) {
    const idToken = await state.user.getIdToken()
    this.$axios.setToken(idToken, 'Bearer')

    const diary = await this.$axios.$put(`/diaries/${diaryId}`, input)
    commit('updateDiary', { diary })
  },

  async deleteDiary({ state, commit }, { diaryId }) {
    const idToken = await state.user.getIdToken()
    this.$axios.setToken(idToken, 'Bearer')

    await this.$axios.$delete(`/diaries/${diaryId}`)
    commit('removeDiary', { diaryId })
  }
}
