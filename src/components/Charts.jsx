import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import * as V from "victory";
import {
  VictoryTheme,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryContainer,
  VictoryPie,
  VictoryTooltip,
} from "victory";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(177, 236, 158,.4)",
    border: "1px solid transparent",
    padding: "10px 30px",
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  chosenLink: {
    backgroundColor: "rgba(177, 236, 158,.4)",
  },
  ambiTitle: {
    backgroundColor: "white",
    height: "2.2rem",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderRadius: 3,
    fontSize: "1.5rem",
    width: "fit-content",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
  chartCont:{
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",

  },
});

export default function Charts() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchChartData = async () => {
    try {
      const res = await fetch(`http://localhost:666/controlPanel/charts`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });
      const data = await res.json();
      // console.log(data);

      if (data.favsLocations) {
        let temp = [];
        for (const vacation of data.followersVacations) {
          temp.push({
            vacation: vacation.name,
            followers: vacation.numOfFollowers,
            label: `${vacation.name} (${vacation.location_name}, ${vacation.country})`
          });
        }
        setChart1Data(temp);
        temp = [];
        for (const location of data.favsLocations) {
          temp.push({
            location: `${location.name}, ${location.country}`,
            favoriters: location.numOfFavs,
            label: location.name
          });
        }
        setChart2Data(temp);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchVacations = async () => {
    try {
      const res = await fetch(`http://localhost:666/explore`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });
      const data = await res.json();
      // console.log(data);

      if (res.status !== 200) {
        return 1;
      }
    } catch (error) {
      // console.log(error);
    }
  };
  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [chart1Data, setChart1Data] = useState([]);
  const [chart2Data, setChart2Data] = useState([]);
  

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const classes = useStyles();

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchChartData();
  }, []);

  //   oooo  .oooooo..o ooooooo  ooooo
  //   `888 d8P'    `Y8  `8888    d8'
  //    888 Y88bo.         Y888..8P
  //    888  `"Y8888o.      `8888'
  //    888      `"Y88b    .8PY888.
  //    888 oo     .d8P   d8'  `888b
  // .o. 88P 8""88888P'  o888o  o88888o
  // `Y888P
  return (
    <div className={clsx(classes.root)}>
      <div className={clsx(classes.firstChartCont)}>
        <div className={clsx(classes.ambiTitle)}>Followers Per Vacation</div>
        {/* CHART1 */}
        {<div className={clsx(classes.chartCont)}>
          <VictoryChart
            // theme={'material'}
            domainPadding={{ x: 10, y: [0, 20] }}
            height={300}
            // width ={100}
            padding={75}
            // theme={VictoryTheme.material}
            style={{
              parent: {
                // border: "1px solid #ccc",
                borderRadius: 3,
                background: "rgba(0,0,0,.1)",
                marginTop: "20px",
              },
              background: {
                fill: "rgba(134, 20, 115, .1)",
              },
            }}
          >
            <VictoryAxis
              fixLabelOverlap
              style={{
                // backgroundColor: "red",
                axis: { stroke: "transparent" },
                tickLabels: {
                  fontSize: 9,
                  padding: 15,
                  fill: "#99EBD9 ",
                  angle: 15,
                  verticalAnchor: "middle",
                  textAnchor: "middle",
                },
                axisLabel: {
                  background: "rga(255,255,255,.6)",
                  border: "1px solid white",
                  fontSize: 10,
                  fill: '#99EBD9'
                },
              }}
              label={"Vacations (hover to see details)"}
              tickFormat={(x)=>''}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis:{
                  stroke:'transparent',
                },
                tickLabels: {
                  fontSize: 9,
                  padding: 1,
                  fill: "#99EBD9 ",
                  verticalAnchor: "middle",
                },
              }}
              tickFormat={(x) => `${x} Followers`}
            />
            <VictoryBar
            labelComponent={<VictoryTooltip
            style={{
              fontSize: 5,
              parent: {background: 'red'}


            }}
            />}
              theme={VictoryTheme.material}
              data={chart1Data}
              barWidth={7}
              x="vacation"
              y="followers"
              width={10}
              height={100}
              offsetY={90}
              style={{
                data: {
                  fill: "#BCFF0D",
                  // stroke: "#BCFF0D",
                  // strokeWidth: 2
                },
              }}
            />
            {/* {console.log(VictoryTheme.material)} */}
          </VictoryChart></div>
        }

        {/* <CustomTheme chart1Data={chart1Data}/> */}
      </div>
      <div className={clsx(classes.secondChartCont)}>
        <div className={clsx(classes.ambiTitle)}>Favorites Per Location</div>
        {/* CHART1 */}
        {<div className={clsx(classes.chartCont)}>
          <VictoryChart domainPadding={24} padding={75}
          
          style={{
            parent: {
              // border: "1px solid #ccc",
              borderRadius: 3,
              background: "rgba(0,0,0,.1)",
              marginTop: "20px",
            },
            background: {
              fill: "transparent",
            },
        
         
          }}
          >
            {/* <VictoryAxis fixLabelOverlap
   style={{
                axis:{
                  stroke:'transparent',
                },
                tickLabels: {
                  fontSize: 9,
                  padding: 1,
                  fill: "#99EBD9 ",
                  verticalAnchor: "middle",
                },
              }}

            /> */}
            <VictoryAxis dependentAxis 
              tickFormat={(x) => ``}

               style={{
                axis:{
                  stroke:'transparent',
                },
                tickLabels: {
                  fontSize: 9,
                  padding: 1,
                  fill: "#99EBD9 ",
                  verticalAnchor: "middle",
                },
              }}
            />
            <VictoryPie
              
              theme={VictoryTheme.material}
              data={chart2Data}
              x="location"
              y="favoriters"
              width={10}
              height={100}
              theme={VictoryTheme.material}
              colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
              style={{
                labels: {
                  fontSize: 10, fill: "#99EBD9"
                },
                data:{
                  // fill:"green",
                  // fillOpacity: 0.9,
    
                },
              }}
            />
          </VictoryChart></div>
        }
      </div>
    </div>
  );
}
