<template>
  <div class="select-demo">
    <selectCondition
    :conditionData="conditionData"
    @changeCondition="changeCondition"
    ></selectCondition>
    <div class="right">
      <selectCondition
        :conditionData="conditionData2"
      ></selectCondition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'djfskf<br/>sjflsdkf',
      conditionData: [
        { condition: '一审', code: '1' },
        { condition: '二审', code: '2' },
        { condition: '三审', code: '3' }
      ],
      conditionData2: [
        { condition: '胡歌', code: '1' },
        { condition: '张怡', code: '2' },
        { condition: '李建师', code: '3' }
      ]
    }
  },
  methods: {
    changeCondition(item) {
      // console.log(item)
    }
  }
}
</script>
<style lang="less" scoped>
.select-demo {
  margin: 100px 0px 0px 10px;
}
.right {
  padding: 80px 120px
}
</style>
