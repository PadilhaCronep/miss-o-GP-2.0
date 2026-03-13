'use client';

import { useEffect, useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import { useAdmin } from '@/components/admin/admin-provider';
import { Panel, SectionHeader } from '@/components/admin/ui';
import type { SiteSettings } from '@/lib/admin/types';

export default function AdminConfiguracoesPage() {
  const { db, updateSettings, resetDemoData } = useAdmin();
  const [settings, setSettings] = useState<SiteSettings>(db.settings);

  useEffect(() => {
    setSettings(db.settings);
  }, [db.settings]);

  const updateField = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Configuracoes Gerais"
        subtitle="Edite conteudos institucionais, metricas, links globais e SEO da plataforma"
        actions={
          <>
            <button
              onClick={resetDemoData}
              className="h-10 px-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-sm inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Restaurar demo
            </button>
            <button
              onClick={() => updateSettings(settings)}
              className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Salvar configuracoes
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Panel className="space-y-3">
          <h2 className="font-semibold">Conteudo principal</h2>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-500">Titulo hero</span>
            <input
              value={settings.heroTitle}
              onChange={(e) => updateField('heroTitle', e.target.value)}
              className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-500">Subtitulo hero</span>
            <textarea
              rows={3}
              value={settings.heroSubtitle}
              onChange={(e) => updateField('heroSubtitle', e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
            />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="space-y-1 block">
              <span className="text-xs text-zinc-500">Texto CTA</span>
              <input
                value={settings.heroCtaLabel}
                onChange={(e) => updateField('heroCtaLabel', e.target.value)}
                className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-xs text-zinc-500">Link CTA</span>
              <input
                value={settings.heroCtaUrl}
                onChange={(e) => updateField('heroCtaUrl', e.target.value)}
                className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
              />
            </label>
          </div>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-500">Texto institucional</span>
            <textarea
              rows={4}
              value={settings.institutionalText}
              onChange={(e) => updateField('institutionalText', e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
            />
          </label>
        </Panel>

        <Panel className="space-y-3">
          <h2 className="font-semibold">SEO e Rodape</h2>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-500">SEO Title</span>
            <input
              value={settings.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-500">SEO Description</span>
            <textarea
              rows={3}
              value={settings.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-500">Texto do rodape</span>
            <input
              value={settings.footerText}
              onChange={(e) => updateField('footerText', e.target.value)}
              className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
            />
          </label>

          <label className="space-y-1 block">
            <span className="text-xs text-zinc-500">Metricas da home (um por linha: Label|Valor)</span>
            <textarea
              rows={5}
              value={settings.homeMetrics.map((metric) => `${metric.label}|${metric.value}`).join('\n')}
              onChange={(e) =>
                updateField(
                  'homeMetrics',
                  e.target.value
                    .split('\n')
                    .map((row) => row.trim())
                    .filter(Boolean)
                    .map((row) => {
                      const [label, value] = row.split('|');
                      return { label: label?.trim() || 'Metrica', value: value?.trim() || '-' };
                    }),
                )
              }
              className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm font-mono"
            />
          </label>
        </Panel>
      </div>
    </div>
  );
}
