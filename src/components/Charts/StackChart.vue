<template>
  <chart
    :options="options"
    :style="style"
    :theme="theme"
    :autoresize="autoresize"
  />
</template>

<script>
  export default {
    props: {
      theme: {
        type: String
      },
      height: {
        type: Number,
        default: 100
      },
      seriesData: {
        type: Array
      }
    },
    computed: {
      options() {
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["一般支出", "特別支出", "收入"]
          },
          grid: {
            left: "3%",
            right: "4%",
            top: "10%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
              ]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: this.seriesData,
          color: ["#EF5350", "#FF9800", "#009688"]
        };
      }
    },
    methods: {},
    data() {
      return {
        style: {
          // height: this.height + "%",
          width: "100%"
        },
        autoresize: true
      };
    }
  };
</script>

<style>
</style>