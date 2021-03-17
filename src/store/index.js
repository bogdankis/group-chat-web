import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
    profileFetched: false,
    profile: undefined,
    messages: [],
    profiles: [],
}

const actions = {
    getProfile({ commit }) {
        axios.get('/api/chat/')
        .then(response => {
            commit('SET_PROFILE_FETCHED', response.data)
        .then(response =>{
            commit('SET_PROFILE',response.data)
        .catch(function (error) {
            commit('SET_PROFILE_FETCHED',error.response.data)
        })
        })
        })
        //TODO: Apeleaza endpoint-ul pentru a lua profilul tau.
        // Daca raspunsul este ok, specifica faptul ca profilul a fost adus, folosind mutatia SET_PROFILE_FETCHED
        // Daca raspunsul este ok, salveaza raspunsul in stare folosind mutatia SET_PROFILE
        // Daca raspunsul nu este ok, doar specifica faptul ca profilul a fost adus, folosind mutatia SET_PROFILE_FETCHED
    },
    getMessages({ commit }) {
        axios.get('/api/chat')
        .then(response =>{
            commit('SET_MESSAGES',response.data)
        })
        messages.sort();
        }
        // TODO: Apeleaza endpoint-ul pentru a lut toate mesajele, si salveaza-le folosind mutatia SET_MESSAGES.
        // Vei observa ca mesajele nu sunt in ordinea dorita. Ce ai putea sa aplici pe array pentru a le ordona invers?
    },
    getProfiles({ commit }) {
        axios.get('/api/profiles')
        .then(response =>{
            commit('SET_PROFILES',response.data)
        })
        profiles.sort();
        // TODO: Apeleaza endpoint-ul pentru a lut toate profilele, si salveaza-le folosind mutatia SET_PROFILES.
        // Vei observa ca profilele nu sunt in ordinea dorita. Ce ai putea sa aplici pe array pentru a le ordona invers?
    },
}

const mutations = {
    SET_PROFILE_FETCHED(state, fetched) {
        state.profileFetched = fetched
    },
    SET_PROFILE(state, profile) {
        state.profile = profile
    },
    SET_MESSAGES(state, messages) {
        state.messages = messages
    },
    SET_PROFILES(state, profiles) {
        state.profiles = profiles
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
