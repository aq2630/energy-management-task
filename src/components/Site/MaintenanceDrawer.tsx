'use client';

import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addTicket, setSubmitting, setError } from '@/store/slices/maintenanceSlice';
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription } from '@/components/common/Toast';

interface MaintenanceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  siteId: string;
  siteName: string;
}

const INITIAL_FORM_STATE = {
    woTemplate: '',
    selectedSite: '',
    zone: '',
    region: '',
    clusterId: '',
    hubSite: '',
    uploadedFile: null as string | null,
    woTemplateName: '',
    assignee: '',
    subject: '',
    activityPerformer: '',
    serviceImpact: '',
    opcatT1: '',
    opcatT2: '',
    plannedStartTime: '',
    plannedEndTime: '',
}

export default function MaintenanceDrawer({ isOpen, onClose, siteId, siteName }: MaintenanceDrawerProps) {
  const dispatch = useAppDispatch();
  const { submitting } = useAppSelector((state) => state.maintenance);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    description: string;
    variant: 'default' | 'success' | 'error';
  }>({ 
    title: '', 
    description: '', 
    variant: 'success'
  });
  
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, uploadedFile: file.name }));
    }
  };

  const createTicketObject = (status: 'Draft' | 'Open') => {
    return {
      id: `TKT-${Date.now()}`,
      siteId,
      woTemplate: formData.woTemplate,
      selectedSite: formData.selectedSite,
      zone: formData.zone,
      region: formData.region,
      clusterId: formData.clusterId,
      hubSite: formData.hubSite,
      uploadedFile: formData.uploadedFile,
      woTemplateName: formData.woTemplateName,
      assignee: formData.assignee,
      subject: formData.subject,
      activityPerformer: formData.activityPerformer,
      serviceImpact: formData.serviceImpact,
      opcatT1: formData.opcatT1,
      opcatT2: formData.opcatT2,
      plannedStartTime: formData.plannedStartTime,
      plannedEndTime: formData.plannedEndTime,
      createdAt: new Date().toISOString(),
      status,
    };
  };

  const showSuccessToast = (title: string, description: string) => {
    setToastMessage({ title, description, variant: 'success' });
    setShowToast(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  
  const showErrorToast = (description: string) => {
    setToastMessage({
      title: 'Error',
      description,
      variant: 'error',
    });
    setShowToast(true);
  };

  const resetFormState = () => {
    setFormData(INITIAL_FORM_STATE);
  }

  const handleSaveAsDraft = async () => {
    try {
      dispatch(setSubmitting(true));
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newTicket = createTicketObject('Draft');
      
      dispatch(addTicket(newTicket));
      dispatch(setError(null));
      
      showSuccessToast('Draft Saved!', 'Work order has been saved as draft');
      
      resetFormState()

    } catch (err) {
      showErrorToast('Failed to save draft. Please try again.');
      dispatch(setError('Failed to save draft'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      dispatch(setSubmitting(true));
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newTicket = createTicketObject('Open');
      
      dispatch(addTicket(newTicket));
      dispatch(setError(null));
      
      showSuccessToast('Success!', 'Work order has been submitted successfully');
      
      resetFormState();
    } catch (err) {
      showErrorToast('Failed to submit ticket. Please try again.');
      dispatch(setError('Failed to submit ticket'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-black shadow-xl z-50 overflow-y-auto transform transition-transform duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Create Work Order</h2>
              <p className="text-gray-400 text-sm mt-1">Fill in the data below to create a new work order</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Select WO Template
              </label>
              <select
                value={formData.woTemplate}
                onChange={(e) => handleChange('woTemplate', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Template</option>
                <option value="preventive">Preventive Maintenance</option>
                <option value="corrective">Corrective Maintenance</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Select Site
              </label>
              <select
                value={formData.selectedSite}
                onChange={(e) => handleChange('selectedSite', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Site</option>
                <option value="site-a">Solar Farm Alpha</option>
                <option value="site-b">Wind Farm Beta</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Zone
                </label>
                <input
                  type="text"
                  value={formData.zone}
                  onChange={(e) => handleChange('zone', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Zone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Region"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Cluster ID
                </label>
                <input
                  type="text"
                  value={formData.clusterId}
                  onChange={(e) => handleChange('clusterId', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Cluster ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Hub Site
                </label>
                <input
                  type="text"
                  value={formData.hubSite}
                  onChange={(e) => handleChange('hubSite', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Hub Site"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-gray-800/50">
                <div className="mb-3">
                  <span className="inline-block text-yellow-500 text-4xl mb-2">📁</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Click to upload</p>
                <p className="text-gray-500 text-xs mb-3">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors"
                >
                  Browse Files
                </label>
                <p className="text-gray-500 text-xs mt-3">
                  {formData.uploadedFile || 'No Files uploaded yet'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                WO Templates Name
              </label>
              <input
                type="text"
                value={formData.woTemplateName}
                onChange={(e) => handleChange('woTemplateName', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter template name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Assignee
              </label>
              <select
                value={formData.assignee}
                onChange={(e) => handleChange('assignee', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Assignee</option>
                <option value="john-doe">John Doe</option>
                <option value="jane-smith">Jane Smith</option>
                <option value="mike-johnson">Mike Johnson</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                rows={3}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter Subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Activity Performer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.activityPerformer}
                onChange={(e) => handleChange('activityPerformer', e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Select Activity Performer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Service Impact <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.serviceImpact}
                onChange={(e) => handleChange('serviceImpact', e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Service Impact</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                OpCAT T1 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.opcatT1}
                onChange={(e) => handleChange('opcatT1', e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select OpCAT T1</option>
                <option value="electrical">Electrical</option>
                <option value="mechanical">Mechanical</option>
                <option value="civil">Civil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                OpCAT T2 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.opcatT2}
                onChange={(e) => handleChange('opcatT2', e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select OpCAT T2</option>
                <option value="repair">Repair</option>
                <option value="replacement">Replacement</option>
                <option value="upgrade">Upgrade</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Planned Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={formData.plannedStartTime}
                onChange={(e) => handleChange('plannedStartTime', e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Planned End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={formData.plannedEndTime}
                onChange={(e) => handleChange('plannedEndTime', e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                type="button"
                onClick={handleSaveAsDraft}
                disabled={submitting}
                className="flex-1 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastProvider>
        {showToast && (
            <Toast variant={toastMessage.variant} open={showToast} onOpenChange={setShowToast}>
            <ToastTitle>{toastMessage.title}</ToastTitle>
            <ToastDescription>{toastMessage.description}</ToastDescription>
            </Toast>
        )}
        <ToastViewport />
    </ToastProvider>
    </>
  );
}