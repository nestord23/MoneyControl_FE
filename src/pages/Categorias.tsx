import { useState } from 'preact/hooks';
import CabeceraCategorias from '../components/CabeceraCategorias';
import CuadriculaCategorias from '../components/CuadriculaCategorias';
import EditorCategorias from '../components/EditorCategorias';
import Paginacion from '../components/Paginacion';
import { useCategoriesList } from '../hooks/useCategoriesList';
import { useUIStore } from '../store/ui';
import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from '../types/categorias';

export default function Categorias() {
  const { categories, totalPages, page, loading, setPage, create, update, remove } = useCategoriesList();
  const showToast = useUIStore(s => s.showToast);
  const [editingCategory, setEditingCategory] = useState<CategoryResponse | null>(null);

  const handleCreate = async (data: CreateCategoryRequest) => {
    try {
      await create(data);
      showToast('Categoría creada correctamente', 'success');
    } catch (e: any) {
      showToast(e.message || 'Error al crear categoría', 'error');
    }
  };

  const handleUpdate = async (id: number, data: UpdateCategoryRequest) => {
    try {
      await update(id, data);
      setEditingCategory(null);
      showToast('Categoría actualizada correctamente', 'success');
    } catch (e: any) {
      showToast(e.message || 'Error al actualizar categoría', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
      showToast('Categoría eliminada', 'success');
    } catch (e: any) {
      showToast(e.message || 'Error al eliminar categoría', 'error');
    }
  };

  const handleEdit = (category: CategoryResponse) => {
    setEditingCategory(category);
  };

  return (
    <div class="pagina-categorias">
      <CabeceraCategorias />
      <CuadriculaCategorias categories={categories} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      {totalPages > 1 && <Paginacion page={page} totalPages={totalPages} onPageChange={setPage} />}
      <EditorCategorias editingCategory={editingCategory} onCreate={handleCreate} onUpdate={handleUpdate} />
    </div>
  );
}
