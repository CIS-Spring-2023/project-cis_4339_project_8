export const chartdata = { // Created Pie chart from chart,js template on their website
    type: "pie",
    data: {
      labels: ["77532", "77338", "77885", "76532"], // Hardcodes random are codes for testing
      datasets: [
        {
          label: "Customers by Zipcode", // used the same setup as Planetchart data code
          data: [23, 50, 71, 26,],
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
  
  export default chartdata; 
  