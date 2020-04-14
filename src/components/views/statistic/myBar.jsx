import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import {Card} from "antd";

class MyBar extends Component {
  render() {
    const data = [
      {name: 'Cheese Cake', store: 4000, online: 2400},
      {name: 'Mousse Cake', store: 3000, online: 1398},
      {name: 'Chocolate Cake', store: 2000, online: 9800},
      {name: 'Fruit Cake', store: 2780, online: 3908},
      {name: 'Fruit Cake', store: 1890, online: 4800},
    ];

    return (
      <div className="myBar">
        <Card title="Card title">
          <BarChart
            width={650}
            height={300}
            data={data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="store" stackId="a" fill="#8884d8"/>
            <Bar dataKey="online" stackId="a" fill="#82ca9d"/>
          </BarChart>
        </Card>
      </div>
    );
  }
}

export default MyBar;