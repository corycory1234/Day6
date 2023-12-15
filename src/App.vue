<template>
  <div class="container mt-5">
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
          <div class="container">
            <div class="row justify-content-center align-items-center">
              <ul v-show="!toFilter" class="p-0">
                <li class="liBackground text-center py-3 my-1 col-10 col-md-6 m-auto">Filter For A City</li>
                <li class="liBackground text-center py-3 my-1 col-10 col-md-6 m-auto">Or A State</li>
              </ul>

            </div>
          </div>

        <!-- 3. 渲染 filteredArr -->
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <ul v-show="toFilter" class="p-0">
              <li v-for="(item) in toFilter" :key="item.rank" 
              class="col-10 col-md-6 liBackground py-3 my-1 m-auto shadow-sm">
                <span class="ms-3" :class="{match: matchKeywords }">{{ item.city }}, {{ item.state }}</span> 
                <span class="float-end smallFont pe-3">{{ item.population }}</span>
              </li>
            </ul>

          </div>
        </div>


</template>

<style lang="scss" scoped>
  .liBackground {
    background-color: rgb(242, 236, 236);
  }
  .smallFont {
    font-size: 16px;
  }
  .match {
    background-color: #ffc600;
  }
  ul li:nth-child(odd) {
    transform: perspective(100px) rotateX(-3deg) translateY(3px) scale(1.001);
  };
  ul li:nth-child(even) {
    transform: perspective(100px) rotateX(3deg) translateY(3px) scale(1.001);
  }
</style>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
// 1. API串接
const arr = ref([]);
const getData = () => {
  axios.get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then((reponse) => {
      arr.value = reponse.data;
      console.log(arr);
    })
    .catch((error) => console.log(error));
};
onMounted(getData)

// 2. <input>搜尋框
const inputValue = ref(null);

// 3. 即時過濾
const toFilter = computed(() => {
  if (inputValue.value) {
    return arr.value.filter((item) => {
      return item.city.toLowerCase().includes(inputValue.value.toLowerCase()) || 
      item.state.toLowerCase().includes(inputValue.value.toLowerCase())
    })
  }else if(toFilter.length === 0){
    console.log(123);
    alert("NO MATCH!!");
  };
  // 3.1 人口數(字串) 上 千分位 (這方法感覺太粗暴)
  arr.value.forEach((item) => {
    const thousand = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    item.population = item.population.replace(thousand, ",");
  })
})

// 4. <input>文字上背景色 (失敗)
const matchKeywords = computed(() => {
  if(inputValue.value) {
    return arr.value.filter((item) => {
      return item.city.toLowerCase().split("").includes(inputValue.value.toLowerCase());
    })
  }
})

</script>
