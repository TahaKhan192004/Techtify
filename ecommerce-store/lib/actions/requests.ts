'use server'
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitProductRequest(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const email = formData.get('email') as string;
  const contact = formData.get('contact') as string;
  const price = formData.get('price') as string;
  const file = formData.get('image') as File;

  let imageUrl = '';

  // 1. Upload image if it exists
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from('request-images')
      .upload(fileName, file);

    if (uploadError) throw new Error('Image upload failed');
    
    const { data: { publicUrl } } = supabase.storage
      .from('request-images')
      .getPublicUrl(fileName);
    imageUrl = publicUrl;
  }

  // 2. Insert into Database
  const { error } = await supabase
    .from('requested_products')
    .insert([{
      name,
      description,
      email,
      contact_number: contact,
      reference_price: parseFloat(price),
      images: imageUrl ? [imageUrl] : []
    }]);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/requests');
  return { success: true };
}