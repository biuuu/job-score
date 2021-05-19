<template>
  <div class="mx-auto container flex flex-col items-center justify-center h-screen">
    <div class="result text-gray-700 my-2 flex space-x-6 items-center h-12">
      <p class="flex items-center"><span>工作性价比：</span><span v-if="state.status !== 'init'" class="font-bold text-2xl text-red-500">{{text}}</span></p>
      <p><span>得分：</span><span v-if="state.status !== 'init'">{{result}}</span></p>
    </div>
    <el-form class="sm:flex shadow border rounded border-gray-200 pt-8 pb-6 pr-8 bg-gray-100 sm:space-x-4" size="mini" :model="state.form" label-width="120px">
      <div class="mx-auto">
        <el-form-item label="月薪">
          <el-input-number :controls="state.controls" v-model="state.form.salary" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="工作时长">
          <el-input-number :controls="state.controls" v-model="state.form.workTime" :min="0" :max="24"></el-input-number>
        </el-form-item>
        <el-form-item label="通勤时长">
          <el-input-number :controls="state.controls" v-model="state.form.roadTime" :min="0" :max="24"></el-input-number>
        </el-form-item>
        <el-form-item label="摸鱼时长">
          <el-input-number :controls="state.controls" v-model="state.form.fishTime" :min="0" :max="24"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="学历系数">
          <el-select v-model="state.form.option1" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作环境系数">
          <el-select v-model="state.form.option2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="异性环境系数">
          <el-select v-model="state.form.option3" placeholder="请选择">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="同事环境系数">
          <el-select v-model="state.form.option4" placeholder="请选择">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="职业资格系数">
          <el-select v-model="state.form.option5" placeholder="请选择">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否8:30前上班">
          <el-select v-model="state.form.option6" placeholder="请选择">
            <el-option
              v-for="item in options6"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="综合环境系数">
          <el-select v-model="state.form.option7" placeholder="请选择">
            <el-option
              v-for="item in options7"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="start()">计算</el-button>
        </el-form-item>
      </div>
    </el-form>
    <a class="my-8" href="https://github.com/biuuu/job-score">
      <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
    </a>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const state = reactive({
  status: 'init',
  form: {
    salary: 7000,
    workTime: 8,
    roadTime: 1,
    fishTime: 4,
    option1: 1,
    option2: 1,
    option3: 1,
    option4: 1,
    option5: 1,
    option6: 1,
    option7: 1
  },
  controls: false
})
const options1 = [
  { label: '专科及以下', value: 0.8 },
  { label: '普通本科', value: 1 },
  { label: '高级本科', value: 1.2 },
  { label: '普通硕士', value: 1.4 },
  { label: '高级硕士', value: 1.6 },
  { label: '普通博士', value: 1.8 },
  { label: '高级博士', value: 2 }
]
const options2 = [
  { label: '偏僻地区', value: 0.8 },
  { label: '工厂户外', value: 0.9 },
  { label: '普通', value: 1 },
  { label: '体制内', value: 1.1 }
]
const options3 = [
  { label: '没有', value: 0.9 },
  { label: '不多不少', value: 1 },
  { label: '很多', value: 1.1 }
]
const options4 = [
  { label: 'SB很多', value: 0.95 },
  { label: '普通很多', value: 1 },
  { label: '优秀很多', value: 1.05 }
]
const options5 = [
  {　label: '无要求', value: 1　},
  {　label: '建造造价监理', value: 1.05　},
  {　label: '建筑岩土结构', value: 1.1　},
  {　label: '主任医师、教授', value: 1.15　}
]
const options6 = [
  { label: '是', value: 0.95 },
  { label: '否', value: 1 }
]
const options7 = [
  { label: '一线城市', value: 1.5 },
  { label: '城市', value: 1.2 },
  { label: '小城市', value: 1 },
  { label: '镇村', value: 0.8 }
]

const result = computed(() => {
  const data = state.form
  const val1 = data.option2 * data.option3 * data.option4 * data.option5
  const val2 = 35 * (data.workTime + data.roadTime - data.fishTime / 2) * data.option1
  return (data.salary / 22 * val1 / val2 * data.option6).toFixed(2)
})

const text = computed(() => {
  if (result.value < 0.8) {
    return '很惨'
  } else if (result.value < 1.5) {
    return '一般'
  } else if (result.value < 2) {
    return '很爽'
  } else {
    return '爽到爆炸'
  }
})

watch(state.form, () => {
  const data = state.form
  if (data.workTime + data.roadTime > 24) {
    state.form.workTime = 24 - data.roadTime
  }
  if (data.fishTime > data.workTime) {
    state.form.fishTime = data.workTime
  }
})

const start = () => state.status = 'started'
</script>

<style>
.result {
  font-family: 宋体;
}
</style>