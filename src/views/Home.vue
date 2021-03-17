<template>
  <div class="">
    <div v-if="!profileFetched">
      <span>Loading</span>
    </div>
    <div v-else>
      <div v-if="profile" class="m-8 grid grid-cols-3 gap-8">
        <div class="flex flex-col p-8 shadow">
          <div class="flex justify-between">
            <span class="font-medium">Profiles</span>
            <refresh-cw-icon
              class="w-4 h-4 text-green-600 cursor-pointer"
              @click="refreshProfiles()"
            ></refresh-cw-icon>
          </div>
          <div v-for="prof in profiles" v-bind:key="prof.id">
            <hr class="my-4" />
            <div class="flex justify-between items-center">
              <span class="">{{ prof.name }}</span>
              <div
                v-if="prof.online"
                class="rounded-full w-2 h-2 bg-green-600"
              ></div>
              <div
                v-else
                class="rounded-full w-2 h-2 border border-green-600"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col col-span-2 py-8 px-4 shadow height-without-header"
        >
          <div class="flex justify-between items-center px-4">
            <span class="font-medium">Chat</span>
            <refresh-cw-icon
              class="w-4 h-4 text-green-600 cursor-pointer"
              @click="refreshChat()"
            ></refresh-cw-icon>
          </div>
          <div
            class="mt-4 flex-grow flex flex-col-reverse overflow-y-auto space-y-4 scrollbar-thin hover:scrollbar-thumb-green-400 scrollbar-thumb-green-600 scrollbar-thumb-rounded px-4"
          >
            <div
              v-for="message in messages"
              v-bind:key="message.id"
              class="shadow border p-2 rounded-lg mt-4 border-green-200 flex flex-col"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">{{ message.sender }}</span>
                <span class="text-xs font-light">{{
                  getTimeAgo(message)
                }}</span>
              </div>
              <span class="mt-2">{{ message.message }}</span>
            </div>
          </div>
          <hr class="my-4 mx-4" />
          <div class="flex px-4">
            <input
              v-on:keyup.enter="sendMessage"
              v-model="message"
              class="text-sm flex-grow min-w-0 border border-green-600 leading-normal tracking-wide border-grey-light rounded-lg p-2 font-roboto outline-none"
              id="messageInput"
              placeholder="Type your message"
              type="text"
            />
            <button
              @click="sendMessage()"
              class="focus:outline-none ml-2 bg-green-600 px-4 rounded-lg text-sm text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col items-start p-8 mt-8 mx-auto shadow rounded-lg w-1/2"
      >
        <span class="font-bold">Create your profile</span>
        <input
          v-on:keyup.enter="createProfile"
          v-model="name"
          class="mt-4 w-full text-sm flex-grow min-w-0 border border-blue-600 leading-normal tracking-wide border-grey-light rounded p-2 font-roboto outline-none"
          id="nameInput"
          placeholder="Type your name"
          type="text"
        />
        <button
          @click="createProfile()"
          class="mt-4 text-sm rounded-lg border px-4 py-1 bg-green-600 shadow items-center text-white font-medium hover:bg-green-600 focus:outline-none"
        >
          Create Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { timeAgo } from "@/timeago";
import { RefreshCwIcon } from "vue-feather-icons";
import moment from "moment";

export default {
  name: "Home",
  components: { RefreshCwIcon },
  methods: {
    getTimeAgo(message) {
      return moment(new Date(message.createdAt))
        .add(2, "hours")
        .subtract(1, "seconds")
        .fromNow();
    },
    refreshChat() {
      store.dispatch('getMessages')
      //TODO: Apeleaza action-ul getMessages din store
    },
    refreshProfiles() {
      store.dispatch('getProfiles')
      //TODO: Apeleaza action-ul getProfiles din store
    },
    createProfile() {
      if(this.name !==''){
        axios
          .post('http://group-chat-parent-server.herokuapp.com/api/profile/',payload)
          .then(res => dispatch('SET_PROFILE', res.data))
          .catch(function (error) {
          console.log(error)
        })
        }
        if(response.ok){
          store.commit('SET_PROFILE')
      }
      

      //TODO: Folosind axios, apeleaza endpoint-ul de post pentru a crea profilul.
      // Verifica ca numele sa nu fie gol.
      // Dupa ce ai primit raspuns, seteaza profilul din store, folosind o mutatie deja existenta
    },
    sendMessage() {
   if(this.message !==''){
   axios
        .post('http://group-chat-parent-server.herokuapp.com/api/chat/', payload)
        .then(res => dispatch('SET_MESSAGES', res.data))
        .catch(function (error) {
          console.log(error)          
    })
            if(response.ok){
          store.commit('SET_PROFILE')
      }
   }
 
      //TODO: Folosind axios, cheama endpoint-ul de post pentru a crea un mesaj.
      // Verifica ca message sa nu fie gol.
      // Dupa ce ai primit raspuns, seteaza messages din store, folosind o mutatie deja existenta
      // Sterge continutul din message
    },
  },
  computed: {
    profileFetched() {
      return this.$store.state.profileFetched
      //TODO: Return din store profileFetched
    },
    profiles() {
      return this.$store.state.profiles
      //TODO: Return din store profiles
    },
    messages() {
      return this.$store.state.messages
      //TODO: Return din store messages
    },
    profile() {
      return this.$store.state.profile
      //TODO: Return din store profile
    },
  },
  created() {
    //TODO: Apeleaza action-urile respective pentru a lua profilul tau, toate profilele si toate mesajele
    store.dispatch('getProfile')
    store.dispatch('getProfiles')
    store.dispatch('getMessages')
  },
  data() {
    return {
      name: "",
      message: "",
    };
  },
};
</script>

<style>
.height-without-header {
  height: calc(100vh - 8rem);
}
</style>
