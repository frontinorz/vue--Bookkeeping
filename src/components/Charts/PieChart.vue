<template>
  <chart
    :options="options"
    :style="style"
    :theme="theme"
    :seriesData="seriesData"
  />
</template>

<script>
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: false
      },
      titleText: {
        type: String,
        default: ""
      },
      titleFontSize: {
        type: Number,
        default: 18
      },
      showLabel: {
        type: Boolean,
        default: false
      },
      showLabelLines: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: 100
      },
      theme: {
        type: String
      },
      showTooltip: {
        type: Boolean,
        default: true
      },
      seriesData: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      options() {
        return {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: this.seriesData.map(item => item.name)
            // selected: data.selected
          },
          series: [
            {
              name: "分類",
              type: "pie",
              radius: "55%",
              center: ["40%", "50%"],
              data: this.seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
      }
    },
    data() {
      return {
        style: {
          // height: this.height + "%",
          width: "100%"
        }
      };
    }
  };
</script>

<style>
</style>