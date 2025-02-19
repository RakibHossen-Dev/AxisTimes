import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publications = [], refetch } = useQuery({
    queryKey: ["publication"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publication");
      return res.data;
    },
  });

  // console.log(publications);

  const data = [
    ["Task", "Hours per Day"],
    ...publications.map((publication) => [
      publication.publisherName,
      publication.articleCount,
    ]),
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
    <div className="lg:pt-16 dark:bg-black">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />

      <div className="mb-10">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="100%"
          data={datas}
        />
      </div>

      <div>
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
