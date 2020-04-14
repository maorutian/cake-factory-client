import React, {Component} from 'react';
import {PieChart, Pie, Tooltip, Cell} from 'recharts';
import {Card} from "antd";

class MyPie extends Component {
  render() {
    const data = [
      {name: '$0 - $50', value: 8},
      {name: '$50 - $100', value: 12},
      {name: '$100 - $150', value: 19},
      {name: '$150 - $200', value: 5},

      ];

    const COLORS = ['#8884d8', '#0088FE', '#c14068', '#82ca9d'];

    return (
      <div className="myPie">
        <Card title="Card title">
          <PieChart width={300} height={300}
                    margin={{
                      top: 0, right: 30, left: 20, bottom: 5,
                    }}>
            <Pie isAnimationActive={false} data={data} cx={150} cy={150} outerRadius={80} fill="#8884d8" label>
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
            </Pie>
            <Tooltip/>
          </PieChart>
        </Card>
      </div>
    );
  }
}

export default MyPie;