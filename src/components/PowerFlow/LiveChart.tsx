'use client';

import { useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPollingState, addChartData, setLoading, setError } from '@/store/slices/powerSlice';
import { usePolling } from '@/hooks/usePolling';
import Button from '@/components/common/Button';

export default function LiveChart() {
  const dispatch = useAppDispatch();
  const { chartData, currentPower, isPolling } = useAppSelector((state) => state.power);

  const fetchPowerData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/power/live');
      const result = await response.json();
      dispatch(addChartData(result.data));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError('Failed to fetch power data'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  usePolling(fetchPowerData, 60000, isPolling);

  const handleStart = () => {
    dispatch(setPollingState(true));
  };

  const handleStop = () => {
    dispatch(setPollingState(false));
  };

  const chartOptions = {
    title: {
      text: 'Real-Time Power Flow',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 18,
      },
    },
    backgroundColor: '#1a1a2e',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#333',
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      data: ['Active Power', 'Reactive Power'],
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
      boundaryGap: false,
      data: chartData.map((item) => new Date(item.timestamp).toLocaleTimeString()),
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
      name: 'Power (kW)',
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
        name: 'Active Power',
        type: 'line',
        smooth: true,
        data: chartData.map((item) => item.activePower.toFixed(2)),
        lineStyle: {
          color: '#ff4757',
          width: 2,
        },
        itemStyle: {
          color: '#ff4757',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 71, 87, 0.3)' },
              { offset: 1, color: 'rgba(255, 71, 87, 0)' },
            ],
          },
        },
      },
      {
        name: 'Reactive Power',
        type: 'line',
        smooth: true,
        data: chartData.map((item) => item.reactivePower.toFixed(2)),
        lineStyle: {
          color: '#5352ed',
          width: 2,
        },
        itemStyle: {
          color: '#5352ed',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(83, 82, 237, 0.3)' },
              { offset: 1, color: 'rgba(83, 82, 237, 0)' },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-6">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-white">
          <div className="text-sm text-gray-400">Current Power</div>
          <div className="flex gap-6 mt-2">
            <div>
              <span className="text-red-400">Active: </span>
              <span className="font-semibold">{currentPower.active.toFixed(2)} kW</span>
            </div>
            <div>
              <span className="text-blue-400">Reactive: </span>
              <span className="font-semibold">{currentPower.reactive.toFixed(2)} kVAR</span>
            </div>
          </div>
        </div>
      </div>
      
      <ReactECharts option={chartOptions} style={{ height: '400px' }} />
      
      <div className="mt-4 flex gap-4 items-center">
        <Button variant="success" onClick={handleStart} disabled={isPolling}>
          Start
        </Button>
        <Button variant="danger" onClick={handleStop} disabled={!isPolling}>
          Stop
        </Button>
        {isPolling && (
          <span className="flex items-center text-green-400 text-sm">
            <span className="animate-pulse mr-2">●</span> Polling active
          </span>
        )}
      </div>
    </div>
  );
}