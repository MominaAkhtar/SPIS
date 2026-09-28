import React from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import { ShieldCheck } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Terms of Service & Privacy Policy"
      subtitle="SPIS Platform Governance, Data Security & Ethical Analytics"
      maxWidth="max-w-xl"
      footer={
        <Button variant="primary" size="sm" onClick={onClose}>
          I Understand & Agree
        </Button>
      }
    >
      <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-96 pr-1">
        <div className="flex items-center gap-2 text-[#00D284] font-semibold text-sm">
          <ShieldCheck className="w-5 h-5 flex-shrink-0" />
          <span>Intelligence Platform Security & Terms</span>
        </div>

        <section className="space-y-1.5">
          <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
            1. Authorized Access & Compliance
          </h4>
          <p className="text-slate-400">
            Access to the Societal Polarization Intelligence System (SPIS) is strictly restricted to authorized intelligence analysts, researchers, and designated operators. All analytical telemetry, polarization scoring, and network graph visualizations are confidential and governed by international research integrity standards.
          </p>
        </section>

        <section className="space-y-1.5">
          <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
            2. Privacy & Data Handling
          </h4>
          <p className="text-slate-400">
            SPIS ingests public discourse metadata solely for algorithmic polarity detection, bridge user identification, and echo chamber quantification. Personal Identifiable Information (PII) is processed strictly under cryptographic pseudonymization.
          </p>
        </section>

        <section className="space-y-1.5">
          <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
            3. Account Security Obligations
          </h4>
          <p className="text-slate-400">
            You agree to maintain the security of your analytical credentials. Multi-factor authentication and token confidentiality must be strictly preserved. Shared or unauthorized credential usage results in immediate session revocation.
          </p>
        </section>
      </div>
    </Modal>
  );
}
