import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Checkbox from '../../../components/common/Checkbox';
import { Sliders, Bell, Mail, ShieldAlert, Check } from 'lucide-react';

export default function AlertPreferencesModal({ isOpen, onClose }) {
  const [threshold, setThreshold] = useState(70);
  const [channels, setChannels] = useState({
    inApp: true,
    email: true,
    webhook: false,
  });
  const [types, setTypes] = useState({
    polarizationSpike: true,
    echoChamber: true,
    crossCommunityHostility: true,
    sentimentPlummet: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Alert & Predictive Preferences"
      subtitle="Configure real-time trigger thresholds and notification channels."
      maxWidth="max-w-md"
      footer={
        <div className="flex items-center justify-end gap-2 w-full">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            leftIcon={saved ? <Check className="w-3.5 h-3.5" /> : undefined}
          >
            {saved ? 'Saved' : 'Save Preferences'}
          </Button>
        </div>
      }
    >
      <div className="space-y-5 text-xs text-slate-200">
        {/* Risk Threshold Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#00D284]" />
              Polarization Risk Sensitivity Threshold
            </span>
            <span className="font-mono font-bold text-[#00D284]">
              {threshold}/100
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="95"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full h-1.5 bg-[#111D33] rounded-lg appearance-none cursor-pointer accent-[#00D284]"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Relaxed (30)</span>
            <span>Balanced (70)</span>
            <span>Strict (95)</span>
          </div>
        </div>

        {/* Trigger Types */}
        <div className="space-y-2 pt-2 border-t border-[#172338]">
          <span className="font-semibold text-slate-300 block mb-2">
            Active Anomaly Detectors
          </span>
          <div className="space-y-2">
            <Checkbox
              checked={types.polarizationSpike}
              onChange={(checked) =>
                setTypes((prev) => ({ ...prev, polarizationSpike: checked }))
              }
              label="Polarization Spikes (>15% 24h acceleration)"
            />
            <Checkbox
              checked={types.echoChamber}
              onChange={(checked) =>
                setTypes((prev) => ({ ...prev, echoChamber: checked }))
              }
              label="Echo Chamber Formation (Isolation score > 0.80)"
            />
            <Checkbox
              checked={types.crossCommunityHostility}
              onChange={(checked) =>
                setTypes((prev) => ({ ...prev, crossCommunityHostility: checked }))
              }
              label="Cross-Community Toxic Interactions"
            />
            <Checkbox
              checked={types.sentimentPlummet}
              onChange={(checked) =>
                setTypes((prev) => ({ ...prev, sentimentPlummet: checked }))
              }
              label="Severe Negative Sentiment Influx"
            />
          </div>
        </div>

        {/* Notification Channels */}
        <div className="space-y-2 pt-2 border-t border-[#172338]">
          <span className="font-semibold text-slate-300 block mb-2">
            Delivery Channels
          </span>
          <div className="grid grid-cols-2 gap-2">
            <Checkbox
              checked={channels.inApp}
              onChange={(checked) =>
                setChannels((prev) => ({ ...prev, inApp: checked }))
              }
              label="Platform Topbar"
            />
            <Checkbox
              checked={channels.email}
              onChange={(checked) =>
                setChannels((prev) => ({ ...prev, email: checked }))
              }
              label="Analyst Email"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
