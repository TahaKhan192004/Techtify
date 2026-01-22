'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function uploadProduct(formData: FormData) {
  try {
    /* ---------------- Extract Fields ---------------- */

    const name = String(formData.get('name') || '').trim();
    const priceRaw = String(formData.get('price') || '');
    const description = String(formData.get('description') || '');
    const isOnSale = formData.get('is_on_sale') === 'true';

    const files = formData.getAll('images[]') as File[];

    console.log('🚀 Upload started:', {
      name,
      price: priceRaw,
      isOnSale,
      imagesCount: files.length
    });

    /* ---------------- Validation ---------------- */

    if (!name) {
      throw new Error('Product name is required');
    }

    const price = Number(priceRaw);
    if (Number.isNaN(price) || price <= 0) {
      throw new Error('Invalid product price');
    }

    if (files.length === 0) {
      throw new Error('At least one product image is required');
    }

    /* ---------------- Upload Images ---------------- */

    const imageUrls: string[] = [];

    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) continue;

      const ext = file.name.split('.').pop() || 'png';
      const baseName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9]/g, '_')
        .toLowerCase();

      const fileName = `products/${Date.now()}-${baseName}.${ext}`;

      console.log('⬆️ Uploading:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        console.error('❌ Storage upload failed:', uploadError.message);
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }

    if (imageUrls.length === 0) {
      throw new Error('Image upload failed — no images were saved');
    }

    /* ---------------- Insert DB Record ---------------- */

    console.log('📝 Saving product to database');

    const { error: dbError } = await supabase
      .from('products')
      .insert({
        name,
        price,
        description,
        is_on_sale: isOnSale,
        images: imageUrls
      });

    if (dbError) {
      console.error('❌ Database insert failed:', dbError.message);
      throw new Error(`Database error: ${dbError.message}`);
    }

    /* ---------------- Revalidate ---------------- */

    revalidatePath('/products');
    revalidatePath('/admin/products');

    console.log('✅ Product uploaded successfully');

    return { success: true };

  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unexpected server error';

    console.error('💥 Upload failed:', message);

    return {
      success: false,
      error: message
    };
  }
}
