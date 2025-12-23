export interface PowerData {
    timestamp: number;
    activePower: number;
    reactivePower: number;
  }
  
  export interface PowerState {
    currentPower: {
      active: number;
      reactive: number;
    };
    chartData: PowerData[];
    isPolling: boolean;
    loading: boolean;
    error: string | null;
  }
  
  export type AlarmSeverity = 'Site Down' | 'Critical' | 'Major' | 'Minor';
  
  export interface Alarm {
    id: string;
    severity: AlarmSeverity;
    siteName: string;
    eventCode: string;
    description: string;
    startTime: string;
    endTime: string | null;
    tags: string[];
  }
  
  export interface AlarmState {
    alarms: Alarm[];
    favorites: string[];
    searchTerm: string;
    loading: boolean;
    error: string | null;
  }
  
  export type SiteMode = 'Grid Following' | 'Microgrid' | 'Standalone';
  
  export interface EnergyData {
    date: string;
    solar: number;
    grid: number;
  }
  
  export interface SiteInfo {
    id: string;
    name: string;
    location: string;
    mode: SiteMode;
  }
  
  export interface AlarmSummary {
    siteDown: number;
    critical: number;
    major: number;
    minor: number;
  }
  
  export interface SiteState {
    siteInfo: SiteInfo | null;
    energyStats: EnergyData[];
    alarmSummary: AlarmSummary;
    loading: boolean;
    error: string | null;
  }
  
  export interface MaintenanceTicket {
    id: string;
    siteId: string;
    woTemplate: string;
    selectedSite: string;
    zone: string;
    region: string;
    clusterId: string;
    hubSite: string;
    uploadedFile: string | null;
    woTemplateName: string;
    assignee: string;
    subject: string;
    activityPerformer: string;
    serviceImpact: string;
    opcatT1: string;
    opcatT2: string;
    plannedStartTime: string;
    plannedEndTime: string;
    createdAt: string;
    status: 'Draft' | 'Open' | 'In Progress' | 'Resolved';
  }
  
  export interface MaintenanceState {
    tickets: MaintenanceTicket[];
    submitting: boolean;
    lastSubmitted: MaintenanceTicket | null;
    error: string | null;
  }