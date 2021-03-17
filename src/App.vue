<template>
  <div>
    <div class="bg-green-600 p-4 flex justify-between">
    <h1 class="font-medium text-white">Group Chat Project</h1>
    <span class="text-white">{{ name }}</span>
    </div>
  
      <router-view class="container mx-auto" />
  </div>
</template>

<script>
export default {
  mounted() {},
  computed: {
    name() {

 /*    if(typeof profile !== 'undefined') {

        return profile.name;
}     
      else if(profile === 'undefined'){

        return profile.name = '';

}
      */
      // TODO: Ia profilul din store. Daca acesta nu e undefined, returneaza numele, altfel intoarce un string gol.
      
    },
  },
};
</script>