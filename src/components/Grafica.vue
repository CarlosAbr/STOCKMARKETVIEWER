<template>
    <div>
        <v-layout wrap>
            <v-flex xs12 style="background-color:red;">
                  <GChart id="lineChart"
                    type="LineChart"
                    fill="red"
                    :data="chartData"
                    :options="chartOptions"
                />
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
data(){
    return{
                chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          curveType: 'function',
          fill: 'red',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }

      }
    }
},
    
    components:{
         GChart
    }
}
</script>

<style>
    #lineChart{
        background-color:transparent;
    }
</style>