// Maintelligence AI — Mock Data
// Simulated industrial sensor readings and platform data

export const equipmentList = [
  { id: 'EQ-001', name: 'Industrial Motor A1', type: 'AC Induction Motor', location: 'Production Line 1', status: 'operational' },
  { id: 'EQ-002', name: 'Pump Station B3', type: 'Centrifugal Pump', location: 'Cooling System', status: 'warning' },
  { id: 'EQ-003', name: 'Conveyor Drive C2', type: 'Variable Frequency Drive', location: 'Assembly Line 2', status: 'operational' },
  { id: 'EQ-004', name: 'Compressor D1', type: 'Reciprocating Compressor', location: 'Pneumatic System', status: 'critical' },
];

export const sensorBaselines = {
  temperature: { min: 35, max: 95, unit: '°C', warningThreshold: 75, criticalThreshold: 85 },
  motorCurrent: { min: 2, max: 15, unit: 'A', warningThreshold: 12, criticalThreshold: 14 },
  vibration: { min: 0.1, max: 8.0, unit: 'mm/s', warningThreshold: 5.0, criticalThreshold: 7.0 },
};

// Generate time-series data for historical charts
export function generateHistoricalData(hours = 24, intervalMinutes = 15) {
  const points = [];
  const now = Date.now();
  const totalPoints = (hours * 60) / intervalMinutes;

  for (let i = 0; i < totalPoints; i++) {
    const timestamp = now - (totalPoints - i) * intervalMinutes * 60 * 1000;
    const progress = i / totalPoints;

    // Simulate gradual degradation pattern
    const degradation = Math.pow(progress, 2) * 0.3;

    points.push({
      timestamp,
      time: new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temperature: 45 + Math.sin(progress * Math.PI * 4) * 8 + degradation * 20 + (Math.random() - 0.5) * 3,
      motorCurrent: 6.5 + Math.sin(progress * Math.PI * 3) * 1.5 + degradation * 4 + (Math.random() - 0.5) * 0.5,
      vibration: 1.2 + Math.sin(progress * Math.PI * 6) * 0.8 + degradation * 3 + (Math.random() - 0.5) * 0.3,
      healthScore: Math.max(0, Math.min(100, 95 - degradation * 30 + (Math.random() - 0.5) * 5)),
      efficiency: Math.max(0, Math.min(100, 92 - degradation * 15 + (Math.random() - 0.5) * 3)),
    });
  }
  return points;
}

export const alerts = [
  { id: 1, type: 'critical', equipment: 'Compressor D1', message: 'Bearing temperature exceeding critical threshold (87°C)', timestamp: '2 min ago', icon: 'flame' },
  { id: 2, type: 'warning', equipment: 'Pump Station B3', message: 'Vibration levels trending upward — potential imbalance detected', timestamp: '8 min ago', icon: 'activity' },
  { id: 3, type: 'info', equipment: 'Industrial Motor A1', message: 'Scheduled maintenance due in 12 days', timestamp: '15 min ago', icon: 'clock' },
  { id: 4, type: 'warning', equipment: 'Conveyor Drive C2', message: 'Motor current spike detected during startup sequence', timestamp: '23 min ago', icon: 'zap' },
  { id: 5, type: 'info', equipment: 'System', message: 'AI model retrained with 2,400 new data points', timestamp: '1 hr ago', icon: 'brain' },
  { id: 6, type: 'critical', equipment: 'Compressor D1', message: 'Remaining useful life below 15% — immediate action recommended', timestamp: '1 hr ago', icon: 'alert-triangle' },
];

export const eventTimeline = [
  { id: 1, time: '15:24:03', type: 'anomaly', message: 'Anomaly detected in Compressor D1 vibration pattern' },
  { id: 2, time: '15:22:47', type: 'prediction', message: 'AI predicts bearing failure within 14 days (93.2% confidence)' },
  { id: 3, time: '15:20:15', type: 'sensor', message: 'Temperature sensor EQ-004-T1 reading: 87.3°C' },
  { id: 4, time: '15:18:33', type: 'maintenance', message: 'Work order WO-2847 generated for Compressor D1' },
  { id: 5, time: '15:15:02', type: 'system', message: 'Real-time data pipeline health check: OK' },
  { id: 6, time: '15:12:44', type: 'sensor', message: 'Vibration spike detected on Pump Station B3 (4.7 mm/s)' },
  { id: 7, time: '15:10:21', type: 'prediction', message: 'Pump B3 health score updated: 72/100' },
  { id: 8, time: '15:08:09', type: 'system', message: 'Model inference latency: 12ms (within SLA)' },
  { id: 9, time: '15:05:55', type: 'maintenance', message: 'Preventive maintenance completed on Motor A1' },
  { id: 10, time: '15:03:18', type: 'anomaly', message: 'Current waveform anomaly on Conveyor Drive C2' },
];

export const maintenanceRecommendations = [
  {
    id: 1,
    equipment: 'Compressor D1',
    severity: 'critical',
    title: 'Bearing Replacement Required',
    description: 'AI analysis indicates bearing degradation pattern consistent with inner race fault. Immediate replacement recommended to prevent catastrophic failure.',
    confidence: 93.2,
    rul: 14,
    actions: ['Stop compressor within 48 hours', 'Order SKF 6205-2RS bearing', 'Schedule 4-hour maintenance window'],
    estimatedCost: '$1,200',
    estimatedDowntime: '4 hours',
  },
  {
    id: 2,
    equipment: 'Pump Station B3',
    severity: 'warning',
    title: 'Impeller Balancing Required',
    description: 'Vibration analysis shows developing imbalance. Trending analysis predicts threshold exceedance within 30 days.',
    confidence: 87.5,
    rul: 30,
    actions: ['Schedule dynamic balancing', 'Inspect impeller for erosion', 'Check coupling alignment'],
    estimatedCost: '$600',
    estimatedDowntime: '2 hours',
  },
  {
    id: 3,
    equipment: 'Conveyor Drive C2',
    severity: 'info',
    title: 'Scheduled Lubrication',
    description: 'Based on operating hours and thermal analysis, bearing lubrication is approaching recommended interval.',
    confidence: 78.4,
    rul: 45,
    actions: ['Apply Shell Gadus S2 V220 grease', 'Inspect belt tension', 'Check drive alignment'],
    estimatedCost: '$150',
    estimatedDowntime: '30 minutes',
  },
];

export const techStackData = [
  { category: 'Hardware', items: [
    { name: 'ESP32', description: 'IoT Microcontroller', detail: 'Sensor data acquisition & edge processing' },
    { name: 'ACS712', description: 'Current Sensor', detail: 'Motor current measurement (0-30A)' },
    { name: 'DS18B20', description: 'Temperature Sensor', detail: 'Digital temperature monitoring (±0.5°C)' },
    { name: 'ADXL345', description: 'Accelerometer', detail: '3-axis vibration measurement' },
  ]},
  { category: 'Software & AI', items: [
    { name: 'Python', description: 'Backend & ML', detail: 'Data processing & model training' },
    { name: 'TensorFlow', description: 'Deep Learning', detail: 'LSTM-based predictive models' },
    { name: 'Scikit-learn', description: 'Machine Learning', detail: 'Anomaly detection algorithms' },
    { name: 'FastAPI', description: 'API Framework', detail: 'Real-time data serving' },
  ]},
  { category: 'Platform', items: [
    { name: 'React', description: 'Frontend Framework', detail: 'Interactive dashboard UI' },
    { name: 'MQTT', description: 'IoT Protocol', detail: 'Lightweight sensor communication' },
    { name: 'InfluxDB', description: 'Time-Series DB', detail: 'High-performance sensor storage' },
    { name: 'Docker', description: 'Containerization', detail: 'Deployment & orchestration' },
  ]},
];

export const projectResults = [
  { label: 'Prediction Accuracy', value: 94.7, unit: '%', icon: 'target' },
  { label: 'Downtime Reduction', value: 67, unit: '%', icon: 'trending-down' },
  { label: 'Cost Savings', value: 42, unit: '%', icon: 'dollar-sign' },
  { label: 'Mean Detection Time', value: 2.3, unit: 'sec', icon: 'zap' },
  { label: 'Equipment Monitored', value: 4, unit: 'units', icon: 'cpu' },
  { label: 'Data Points Processed', value: 2.4, unit: 'M+', icon: 'database' },
];

export const architectureNodes = [
  { id: 'sensors', label: 'IoT Sensors', sublabel: 'ESP32 + ACS712 + DS18B20 + ADXL345', x: 0, y: 1 },
  { id: 'edge', label: 'Edge Gateway', sublabel: 'MQTT Broker + Pre-processing', x: 1, y: 1 },
  { id: 'pipeline', label: 'Data Pipeline', sublabel: 'Stream Processing + InfluxDB', x: 2, y: 0 },
  { id: 'ai', label: 'AI Engine', sublabel: 'TensorFlow + Scikit-learn', x: 2, y: 2 },
  { id: 'api', label: 'API Layer', sublabel: 'FastAPI + WebSocket', x: 3, y: 1 },
  { id: 'dashboard', label: 'Maintelligence Dashboard', sublabel: 'React + Real-time Viz', x: 4, y: 1 },
];
