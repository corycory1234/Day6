<template >
  <div class="container-fluid mt-5 bgc" >
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-md-6 col-lg-6">
        <!-- 1. 搜尋 <input> -->
        <div class="input-group input-group-lg">
          <input type="text"
          v-model="inputValue" 
          class="form-control text-center border-5" 
          placeholder="City Or State"
          aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
        </div>
      </div>
    </div>
  </div>

        <!-- 2. 預設 <ul> -->
          <div class="container-fluid bgc" v-if="dataLoaded">
            <div class="row justify-content-center align-items-center">
              <ul v-show="!toFilter" class="p-0">
                <li class="liBackground text-center py-3 my-1 col-10 col-md-6 m-auto">Filter For A City</li>
                <li class="liBackground text-center py-3 my-1 col-10 col-md-6 m-auto">Or A State</li>
              </ul>

            </div>
          </div>

        <!-- 3. 渲染 filteredArr -->
        <div class="container-fluid bgc">
          <div class="row justify-content-center align-items-center">
            <ul v-show="toFilter" class="p-0">
              <li v-for="(item) in toFilter" :key="item.rank" 
              class="col-10 col-md-6 liBackground py-3 my-1 m-auto shadow-sm">
                <span class="ms-3" :class="{match: matchKeywords }">
                  {{ item.city }}, {{ item.state }}
                </span> 
                <span class="float-end smallFont pe-3">
                  {{ item.population }}
                </span>
              </li>
            </ul>

          </div>
        </div>

        <!-- 4. 搜尋失敗之渲染  -->
        <div class="contanier-fluid text-center bgc" v-show="toFilter && toFilter.length ===0">
          <p class="text-danger fs-1">NO MATCH FOUND</p>
        </div>

        <!-- 5. API錯誤渲染 -->
        <div class="container-fluid bgc">
          <p class="text-center text-danger fs-1">
            {{ errorMessage }}
          </p>
        </div>

</template>

<style lang="scss" scoped>
</style>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
// 1. API串接
const arr = ref([]);
const errorMessage = ref(null);
const dataLoaded =ref(false);
const getData = () => {
  axios.get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then((reponse) => {
      arr.value = reponse.data;
      dataLoaded.value = true;
      console.log(arr);
    })
    .catch((error) => {
      errorMessage.value = "讀取DATA資料有誤, 請見開發者工具"
      console.log("讀取DATA錯誤", error)
    });
};
onMounted(getData)

// 2. 即時過濾
const inputValue = ref(null); // <input>搜尋框
const toFilter = computed(() => {
  if (inputValue.value && inputValue.value.trim() !== "") {
    return arr.value.filter((item) => {
      return item.city.toLowerCase().includes(inputValue.value.toLowerCase()) || 
      item.state.toLowerCase().includes(inputValue.value.toLowerCase())
    })
  };
  // 2.1 人口數(字串) 上 千分位 (這方法感覺太粗暴)
  arr.value.forEach((item) => {
    const thousand = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    item.population = item.population.replace(thousand, ",");
  })
})

// 3. <input>文字上背景色 (失敗)
const matchKeywords = computed(() => {
  if(inputValue.value) {
    return arr.value.filter((item) => {
      return item.city.toLowerCase().split("").includes(inputValue.value.toLowerCase());
    })
  }
})

</script>