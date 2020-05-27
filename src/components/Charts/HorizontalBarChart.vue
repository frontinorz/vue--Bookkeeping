<template>
  <chart
    :options="options"
    :style="style"
    :autoresize="true"
  />
</template>

<script>
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: true
      },
      titleText: {
        type: String,
        default: ""
      },
      theme: {
        type: String
      },
      // 計算資料筆數乘以barWidth
      height: {
        type: Number,
        default: 100
      },
      barWidth: {
        type: Number,
        default: 25
      },
      seriesData: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      options() {
        return {
          grid: {
            left: "2%",
            right: "5%",
            top: "10%",
            containLabel: true
          },
          tooltip: {},
          xAxis: { type: "value" },
          yAxis: {
            type: "category",
            data: this.seriesData.map(item => {
              return item[1];
            })
          },
          series: [
            {
              type: "bar",
              z: 3,
              label: {
                normal: {
                  position: "right",
                  show: true
                }
              },
              data: this.seriesData.map(item => {
                return item[0];
              }),
              barWidth: this.barWidth,
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
          ],
          color: ["#006699", "#4cabce"]
        };
      },
      style() {
        let dataCount = this.seriesData.length - 1;
        return {
          width: "100%",
          height: this.barWidth * (dataCount + 10) + "px"
        };
      }
    }
  };
</script>

<style>
</style>