import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Card} from "antd";

class MyLine extends Component {


  render() {
    const data = [
      {name: 'JAN', Cheese_Cake	: 4000, Mousse_Cake: 2400, Chocolate_Cake: 2400},
      {name: 'FEB', Cheese_Cake: 3000, Mousse_Cake: 1398, Chocolate_Cake: 2210},
      {name: 'MAR', Cheese_Cake: 2000, Mousse_Cake: 9800, Chocolate_Cake: 2290},
      {name: 'APR', Cheese_Cake: 2780, Mousse_Cake: 5400, Chocolate_Cake: 2000},
      {name: 'MAY', Cheese_Cake: 1890, Mousse_Cake: 4800, Chocolate_Cake: 2181},
      {name: 'JUNE', Cheese_Cake: 2390, Mousse_Cake: 3800, Chocolate_Cake: 2500},
      {name: 'JULY', Cheese_Cake: 3490, Mousse_Cake: 4300, Chocolate_Cake: 2100},
      {name: 'AUG', Cheese_Cake: 1890, Mousse_Cake: 4800, Chocolate_Cake: 2181},
      {name: 'SEPT', Cheese_Cake: 2390, Mousse_Cake: 3800, Chocolate_Cake: 2500},
      {name: 'OCT', Cheese_Cake: 3490, Mousse_Cake: 4300, Chocolate_Cake: 5000},
      {name: 'NOV', Cheese_Cake: 2390, Mousse_Cake: 3800, Chocolate_Cake: 2500},
      {name: 'DEC', Cheese_Cake: 3490, Mousse_Cake: 4300, Chocolate_Cake: 2100},
    ];

    return (
      <div className="myLine">
        <Card title="Card title">
          <LineChart width={800} height={300} data={data}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="Mousse_Cake" stroke="#8884d8"/>
            <Line type="monotone" dataKey="Cheese_Cake" stroke="#82ca9d"/>
            <Line type="monotone" dataKey="Chocolate_Cake" stroke="#0088FE"/>
          </LineChart>
        </Card>
      </div>
    );
  }

}

export default MyLine;