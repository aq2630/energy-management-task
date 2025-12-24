# Mini Energy Management Dashboard

A real-time energy monitoring and management system built with Next.js, Redux Toolkit, and ECharts.

---

## 📋 Overview

This project implements three main modules:
1. **Real-Time Power Flow** - Live chart with 60-second polling
2. **Alarms Management** - Searchable events table with favorites
3. **Site Details** - Energy reports and maintenance ticket creation

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18 or higher
- Yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd energy-management-dashboard
```

2. **Install dependencies**
```bash
yarn install
```

3. **Run development server**
```bash
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

The application will start on port 3000.

---

## 🌍 Environment Variables

**Since we are using Mock data so This project does not require any environment variables.**

All data is generated through mock APIs that run locally within the Next.js application.

---

## 📡 Mock API Endpoints

### 1. Live Power Data
**Endpoint:** `GET /api/power/live`

**Description:** Returns 20 real-time power data points with Active and Reactive power values.

**Polling Behavior:**
- Automatically polled every 60 seconds when active
- Returns exactly 20 new data points per call
- Chart maintains a rolling window of 100 data points

**Response Example:**
```json
{
  "data": [
    {
      "timestamp": 1704067200000,
      "activePower": 125.45,
      "reactivePower": 58.32
    }
  ]
}
```

---

### 2. Alarms Endpoint
**Endpoint:** `GET /api/alarms`

**Query Parameters:**
- `search` (optional): Filter alarms by event code, description, or site name

**Examples:**
```bash
GET /api/alarms
GET /api/alarms?search=inverter
```

**Description:** Returns list of system alarms with severity levels, timestamps, and tags.

**Search Implementation:**
- Server-side filtering
- 400ms client-side debounce to optimize API calls
- Searches across: eventCode, description, siteName

**Response Example:**
```json
{
  "data": [
    {
      "id": "ALM001",
      "severity": "Critical",
      "siteName": "Solar Farm A",
      "eventCode": "INV-001",
      "description": "Inverter offline",
      "startTime": "2024-01-15T08:30:00Z",
      "endTime": null,
      "tags": ["inverter", "power"]
    }
  ]
}
```

---

### 3. Site Details Endpoint
**Endpoint:** `GET /api/site/:id`

**Parameters:**
- `id`: Site identifier (e.g., "1", "2")

**Description:** Returns site information, energy statistics, and alarm summary.

**Response Example:**
```json
{
  "data": {
    "siteInfo": {
      "id": "1",
      "name": "Solar Farm Alpha",
      "location": "Arizona, USA",
      "mode": "Grid Following"
    },
    "alarmSummary": {
      "siteDown": 0,
      "critical": 2,
      "major": 5,
      "minor": 8
    },
    "energyStats": [
      {
        "date": "2024-01-10",
        "solar": 450,
        "grid": 120
      }
    ]
  }
}
```

---

### 4. Maintenance Ticket Submission
**Implementation:** Client-side simulation using setTimeout (1.5 seconds delay)

**Description:** Simulates async ticket creation without actual backend submission.

**Actions:**
- **Submit** - Creates ticket with status "Open"
- **Save as Draft** - Creates ticket with status "Draft"

**Success/Error Handling:**
- Shows success toast notification on successful submission
- Shows error toast notification if submission fails
- Drawer closes automatically on success
- Form resets after successful submission

---

## 📸 Application Views

### 1. Real-Time Power Flow (Live Chart)
**Route:** `/power`

**Features:**
- Real-time Active and Reactive Power visualization using ECharts
- Smooth line animations with sinusoidal waveforms
- Start/Stop controls for polling
- Rolling window of 100 data points
- Current power values display

**Key Implementation:**
- Uses custom `usePolling` hook for interval management
- Redux `powerSlice` manages chart data and polling state
- 60-second automatic polling when active

---

### 2. Alarms Management (Events Table)
**Route:** `/alarms`

**Features:**
- Dark-themed events table
- Real-time search with 400ms debounce
- Favorites system with star icons
- Toggle between "All Alarms" and "Favorites" view
- Severity indicators with color coding
- Tags display for each alarm

**Key Implementation:**
- Uses custom `useDebounce` hook for search optimization
- Redux `alarmSlice` manages alarms state and favorites
- Server-side filtering via query parameters

---

### 3. Site Details (Energy Summary)
**Route:** `/site/:id` (e.g., `/site/1`)

**Features:**
- **Alarm Summary Cards** - Visual dashboard showing alarm counts by severity
  - Site Down
  - Critical
  - Major
  - Minor
- **Energy Report Chart** - Stacked bar chart displaying daily energy consumption
  - Solar energy (orange bars)
  - Grid energy (blue bars)
  - Total energy display
- **Maintenance Ticket Drawer** - Comprehensive work order creation form
  - WO Template selection
  - Site and location details
  - File upload capability
  - Priority and category selection
  - Planned start/end times
  - Save as Draft or Submit options
  - Toast notifications for success/error

**Key Implementation:**
- Dynamic routing with site ID parameter
- Redux `siteSlice` for site information and energy stats
- Redux `maintenanceSlice` for ticket management
- Toast notifications using Radix UI

---

## 🏗️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **ECharts** - Data visualization
- **Tailwind CSS** - Styling
- **ShadCN & Radix UI** - UI Component

---

## 📄 License

This project is for assessment purposes.
