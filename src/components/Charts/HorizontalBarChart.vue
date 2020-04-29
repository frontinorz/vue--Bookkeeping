<template>
  <chart
    :options="options"
    :style="style"
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
          return [
            [91852, "Orange Juice"],
            [101852, "Lemon Juice"],
            [20112, "Monkey"]
          ];
        }
      }
    },
    data() {
      return {
        style: {
          height: "100%",
          width: "100%"
        }
      };
    },
    computed: {
      options() {
        return {
          grid: { containLabel: true },
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
                      "#C1232B",
                      "#B5C334",
                      "#FCCE10",
                      "#E87C25",
                      "#27727B",
                      "#FE8463",
                      "#9BCA63",
                      "#FAD860",
                      "#F3A43B",
                      "#60C0DD",
                      "#D7504B",
                      "#C6E579",
                      "#F4E001",
                      "#F0805A",
                      "#26C0C0"
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ],
          color: ["#006699", "#4cabce"]
        };
      }
      // dataRanking(){

      // }
    }
  };
</script>

<style>
</style>