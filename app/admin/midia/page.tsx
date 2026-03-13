'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Download, ImageIcon, Search, Trash2, Upload } from 'lucide-react';
import { useAdmin } from '@/components/admin/admin-provider';
import { EmptyState, Panel, SectionHeader } from '@/components/admin/ui';
import type { MediaFile } from '@/lib/admin/types';

function createMediaId() {
  return `media_${Math.random().toString(36).slice(2, 10)}`;
}

export default function AdminMidiaPage() {
  const { db, addMediaFiles, deleteMediaFile } = useAdmin();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const files = useMemo(
    () => db.media.filter((file) => file.name.toLowerCase().includes(query.toLowerCase())),
    [db.media, query],
  );

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files;
    if (!selected || selected.length === 0) return;

    const processed = await Promise.all(
      Array.from(selected).map(
        (file) =>
          new Promise<MediaFile>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                id: createMediaId(),
                name: file.name,
                url: String(reader.result),
                mimeType: file.type,
                size: file.size,
                createdAt: new Date().toISOString(),
              });
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          }),
      ),
    );

    addMediaFiles(processed);
    event.target.value = '';
  };

  const download = (file: MediaFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestao de Midia"
        subtitle="Upload, organizacao e selecao de imagens para projetos e perfis"
        actions={
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onUpload}
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </>
        }
      />

      <Panel className="space-y-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar arquivo"
            className="w-full h-10 rounded-sm border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none focus:border-[#FFD600]/60"
          />
        </div>

        {files.length === 0 ? (
          <EmptyState title="Nenhuma midia encontrada" description="Envie imagens para utilizar em projetos e perfis." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {files.map((file) => (
              <div key={file.id} className="rounded-sm border border-white/10 bg-black/20 overflow-hidden group">
                <div className="relative aspect-square bg-black/40">
                  {file.mimeType.startsWith('image/') ? (
                    <Image src={file.url} alt={file.name} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-zinc-600">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs truncate" title={file.name}>{file.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">{(file.size / 1024).toFixed(0)} KB</p>
                  <div className="mt-2 flex gap-1">
                    <button
                      onClick={() => download(file)}
                      className="h-7 flex-1 rounded-sm border border-white/10 hover:bg-white/10 inline-flex items-center justify-center"
                      aria-label="Baixar arquivo"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteMediaFile(file.id)}
                      className="h-7 w-7 rounded-sm border border-white/10 hover:bg-rose-500/20 hover:text-rose-300 inline-flex items-center justify-center"
                      aria-label="Excluir arquivo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
