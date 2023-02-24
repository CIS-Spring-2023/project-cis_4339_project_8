export const planetChartData = {
    type: "pie",
    data: {
      labels: ["77532", "77338", "77885", "76532"],
      datasets: [
        {
          label: "Customers by Zipcode",
          data: [0, 0, 1, 2,],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Number of Customers in the Zip code",
      },
    },
  };
  
  export default planetChartData;
  