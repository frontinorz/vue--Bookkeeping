<template>
  <chart
    :options="options"
    :style="style"
    :theme="theme"
    :seriesData="seriesData"
    :autoresize="true"
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
            // type: "scroll",
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: this.seriesData.map(item => item.name)
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
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      "#2ec7c9",
                      "#b6a2de",
                      "#5ab1ef",
                      "#ffb980",
                      "#d87a80",
                      "#8d98b3",
                      "#e5cf0d",
                      "#97b552",
                      "#95706d",
                      "#dc69aa",
                      "#07a2a4",
                      "#9a7fd1",
                      "#588dd5",
                      "#f5994e",
                      "#c05050",
                      "#59678c",
                      "#c9ab00",
                      "#7eb00a",
                      "#6f5553",
                      "#c14089"
                    ];
                    return colorList[params.dataIndex];
                  }
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