<template>
  <div>
    <div>
      <h3 class="title">
        当前时段价格排行
      </h3>
      <b-table striped hover small bordered fixed :items="rank"></b-table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rank: [{
        '用户ID': '-',
        '当前价格': '-',
      }],
    }
  }
}
</script>

