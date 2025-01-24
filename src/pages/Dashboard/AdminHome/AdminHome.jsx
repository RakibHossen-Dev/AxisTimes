import { Chart } from "react-google-charts";

// import { Chart } from "react-google-charts";
const AdminHome = () => {
  const data = [
    ["Task", "Hours per Day"],
    ["PublicationA", 9],
    ["PublicationB", 2],
    ["PublicationC", 2],
    ["PublicationD", 2],
    ["PublicationE", 7],
  ];

  const options = {
    title: "Publication",
  };



  const datas = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "#8e44ad"], // English color name
    ["Gold", 19.3, "#f39c12"],
    ["Platinum", 21.45, "color: #1abc9c"], // CSS-style declaration
  ];



  const UserData = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
    ["BD", 700],
    ["PK", 300],
    ["UAE", 600],
  ];
  return (
    <div>
      <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />




    <div  className="mb-10">
       <Chart chartType="ColumnChart" width="100%" height="100%" data={datas} />
    </div>


<div >
<Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = UserData[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="100%"
      data={UserData}
    />
    </div>

    </div>
  );
};

export default AdminHome;
