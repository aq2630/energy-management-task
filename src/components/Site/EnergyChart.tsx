'use client';

import ReactECharts from 'echarts-for-react';
import { EnergyData } from '@/types';

interface EnergyChartProps {
  energyStats: EnergyData[];
}

export default function EnergyChart({ energyStats }: EnergyChartProps) {
  const totalEnergy = energyStats.reduce((sum, day) => sum + day.solar + day.grid, 0);

  const chartOptions = {
    title: {
      text: 'Energy Report 1.0 - Total Energy',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16,
      },
    },
    backgroundColor: '#1a1a2e',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#333',
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      data: ['Solar', 'Grid'],
      top: 30,
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: energyStats.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: '#666',
        },
      },
      axisLabel: {
        color: '#999',
      },
    },
    yAxis: {
      type: 'value',
      name: 'Energy (kWh)',
      nameTextStyle: {
        color: '#999',
      },
      axisLine: {
        lineStyle: {
          color: '#666',
        },
      },
      axisLabel: {
        color: '#999',
      },
      splitLine: {
        lineStyle: {
          color: '#333',
        },
      },
    },
    series: [
      {
        name: 'Solar',
        type: 'bar',
        stack: 'total',
        data: energyStats.map((item) => item.solar),
        itemStyle: {
          color: '#ffa502',
        },
      },
      {
        name: 'Grid',
        type: 'bar',
        stack: 'total',
        data: energyStats.map((item) => item.grid),
        itemStyle: {
          color: '#3742fa',
        },
      },
    ],
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="mb-4">
        <div className="text-gray-400 text-sm">Total Energy Generated</div>
        <div className="text-3xl font-bold text-white">{totalEnergy.toFixed(2)} kWh</div>
      </div>
      <ReactECharts option={chartOptions} style={{ height: '400px' }} />
    </div>
  );
}