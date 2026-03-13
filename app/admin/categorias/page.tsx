'use client';

import { useMemo, useState } from 'react';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAdmin } from '@/components/admin/admin-provider';
import { EmptyState, Panel, SectionHeader } from '@/components/admin/ui';

type TabKind = 'categories' | 'objectives' | 'tags';

export default function AdminCategoriasPage() {
  const { db, upsertTaxonomyItem, deleteTaxonomyItem } = useAdmin();
  const [tab, setTab] = useState<TabKind>('categories');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<{ id?: string; name: string; description?: string } | null>(null);

  const list = useMemo(() => {
    const source = db[tab];
    return source.filter((item: any) =>
      `${item.name} ${item.description || ''}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [db, query, tab]);

  const titleMap: Record<TabKind, string> = {
    categories: 'Categorias de projeto',
    objectives: 'Objetivos estrategicos',
    tags: 'Tags funcionais',
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestao de Taxonomia"
        subtitle="Mantenha categorias, objetivos e tags que estruturam o catalogo de projetos"
        actions={
          <button
            onClick={() => setEditing({ name: '', description: '' })}
            className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Novo item
          </button>
        }
      />

      <Panel className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {(['categories', 'objectives', 'tags'] as TabKind[]).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`h-9 px-3 rounded-sm text-sm border transition-colors ${
                tab === item
                  ? 'bg-[#FFD600] text-black border-[#FFD600]'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
              }`}
            >
              {titleMap[item]}
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar em ${titleMap[tab].toLowerCase()}`}
            className="w-full h-10 rounded-sm border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none focus:border-[#FFD600]/60"
          />
        </div>

        {list.length === 0 ? (
          <EmptyState title="Nenhum item encontrado" description="Crie novos itens para estruturar filtros e classificacoes." />
        ) : (
          <div className="space-y-2">
            {list.map((item: any) => (
              <div key={item.id} className="rounded-sm border border-white/10 bg-black/20 p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  {'description' in item && item.description ? (
                    <p className="text-xs text-zinc-500 mt-1">{item.description}</p>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditing({ id: item.id, name: item.name, description: item.description || '' })}
                    className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-white/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTaxonomyItem(tab, item.id)}
                    className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-rose-500/20 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <AnimatePresence>
        {editing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80]"
          >
            <button className="absolute inset-0 bg-black/75" onClick={() => setEditing(null)} />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,92vw)] rounded-sm border border-white/10 bg-[#0A0A0A] p-5"
            >
              <h3 className="text-lg font-semibold mb-4">{editing.id ? 'Editar item' : 'Novo item'}</h3>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  upsertTaxonomyItem(tab, editing);
                  setEditing(null);
                }}
              >
                <label className="space-y-1 block">
                  <span className="text-xs text-zinc-500">Nome</span>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) => setEditing((prev) => ({ ...(prev as any), name: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  />
                </label>

                {tab !== 'tags' ? (
                  <label className="space-y-1 block">
                    <span className="text-xs text-zinc-500">Descricao</span>
                    <textarea
                      rows={3}
                      value={editing.description || ''}
                      onChange={(e) => setEditing((prev) => ({ ...(prev as any), description: e.target.value }))}
                      className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                    />
                  </label>
                ) : null}

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="h-10 px-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm">
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
