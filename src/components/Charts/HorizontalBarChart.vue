<template>
  <chart
    :options="options"
    :theme="theme"
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
        default: 15
      },
      seriesData: {
        type: Object,
        default() {
          return {
            xAxisData: [],
            data: []
          };
        }
      }
    },
    computed: {
      options() {
        return {
          dataset: {
            source: [
              ["amount", "product"],
              [58212, "Matcha Latte"],
              [78254, "Milk Tea"],
              [41032, "Cheese Cocoa"],
              [12755, "Cheese Brownie"],
              [20145, "Matcha Cocoa"],
              [79146, "Tea"],
              [91852, "Orange Juice"],
              [101852, "Lemon Juice"],
              [20112, "Monkey"]
            ]
          },
          grid: { containLabel: true },
          xAxis: { name: "amount" },
          yAxis: { type: "category" },
          series: [
            {
              type: "bar",
              encode: {
                // Map the "amount" column to X axis.
                x: "amount",
                // Map the "product" column to Y axis
                y: "product"
              }
            }
          ],
          color: [
            "#dd6b66",
            "#759aa0",
            "#e69d87",
            "#8dc1a9",
            "#ea7e53",
            "#eedd78",
            "#73a373",
            "#73b9bc",
            "#7289ab",
            "#91ca8c",
            "#f49f42"
          ]
        };
      }
    },
    data() {
      return {
        // style: {
        //   height: this.height + "%",
        //   width: "100%"
        // }
      };
    }
  };
</script>

<style>
</style>