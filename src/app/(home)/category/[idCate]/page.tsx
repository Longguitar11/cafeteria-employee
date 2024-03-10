import { CategoryById } from '@/containers/Category';

export default function IdCategory({ params }: { params: { idCate: string } }) {
  const { idCate } = params;

  return <CategoryById idCate={idCate} className='p-10' />;
}
