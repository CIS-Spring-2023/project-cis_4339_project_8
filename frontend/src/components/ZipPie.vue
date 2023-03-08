<template>
  <div>
    <!-- canvas element for chart -->
    <canvas id="zipppie"></canvas>
  </div>
</template>


<script>
import { Chart, registerables } from 'chart.js'
import chartdata from '../assets/zipcodedata.js'

//we have to register the registerables with Chart object
Chart.register(...registerables);
export default {
  name: 'ZipPie',
  data() {
    return {
      chartdata: chartdata
    }
  },
  //establish Chart object after mounting the component
  mounted() {
    const ctx = document.getElementById('zipppie');
    new Chart(ctx, this.chartdata);
  }
}
</script>