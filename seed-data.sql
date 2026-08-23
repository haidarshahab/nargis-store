INSERT INTO products (name, slug, description, price, compare_price, images, category, collection, stock, featured, colors, sizes) VALUES
-- Dresses Collection (Savana)
(
  'Savana Dress',
  'savana-dress',
  'Dress elegan dengan motif daun tropis yang fresh. Cocok untuk acara casual maupun semi-formal. Bahan premium yang nyaman dan jatuh.',
  210375,
  280500,
  ARRAY[
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop'
  ],
  'dresses',
  'savana',
  15,
  true,
  ARRAY['Green', 'White'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Aveline Dress',
  'aveline-dress',
  'Dress dengan motif abstrak monokrom yang sophisticated. Desain timeless untuk tampil anggun setiap saat.',
  199125,
  265500,
  ARRAY[
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=1000&fit=crop'
  ],
  'dresses',
  'aveline',
  12,
  true,
  ARRAY['Navy', 'Black'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Camelia Blouse Dress',
  'camelia-blouse-dress',
  'Blouse dress dengan motif bunga camelia yang feminin. Cocok untuk brunch date atau acara santai bersama teman.',
  130725,
  157617,
  ARRAY[
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop'
  ],
  'dresses',
  'camelia',
  20,
  true,
  ARRAY['Pink', 'Cream'],
  ARRAY['S', 'M', 'L', 'XL']
),

-- Tops & Blouses Collection (Rosalie)
(
  'Rosalie Blouse',
  'rosalie-blouse',
  'Blouse elegan dengan detail kerut dan motif floral yang lembut. Bahan flowy yang nyaman seharian.',
  157617,
  189140,
  ARRAY[
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&h=1000&fit=crop'
  ],
  'tops',
  'rosalie',
  18,
  true,
  ARRAY['Broken White', 'Sage'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Celeste Tunik',
  'celeste-tunik',
  'Tunik dengan motif bunga biru yang anggun. Panjang ideal untuk dipadukan dengan celana atau rok.',
  153550,
  184260,
  ARRAY[
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop'
  ],
  'tops',
  'celeste',
  14,
  true,
  ARRAY['Blue', 'White'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Lina Blouse',
  'lina-blouse',
  'Blouse kasual dengan potongan flowy. Cocok untuk daily wear dengan sentuhan feminine yang elegan.',
  125000,
  NULL,
  ARRAY[
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop'
  ],
  'tops',
  NULL,
  22,
  false,
  ARRAY['Dusty Pink', 'Cream', 'White'],
  ARRAY['S', 'M', 'L', 'XL']
),

-- Gamis & Abaya Collection
(
  'Gamis Amira Plisket',
  'gamis-amira-plisket',
  'Gamis premium dengan detail plisket yang anggun. Bahan premium yang jatuh dan tidak menerawang.',
  245000,
  NULL,
  ARRAY[
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop'
  ],
  'gamis',
  'amira',
  10,
  true,
  ARRAY['Navy', 'Maroon', 'Black', 'Mocca'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Mazaya Abaya',
  'mazaya-abaya',
  'Abaya crinkle airflow yang ringan dan nyaman. Desain modern untuk wanita aktif.',
  150000,
  200000,
  ARRAY[
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1518622358385-8ea7d7b03223?w=800&h=1000&fit=crop'
  ],
  'gamis',
  'mazaya',
  16,
  false,
  ARRAY['Dusty Pink', 'Grey', 'Brown'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Ameena Abaya Hitam',
  'ameena-abaya-hitam',
  'Abaya hitam klasik dengan detail manik-manik elegan. Cocok untuk acara formal dan semi-formal.',
  225000,
  NULL,
  ARRAY[
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop'
  ],
  'gamis',
  'ameena',
  8,
  false,
  ARRAY['Black'],
  ARRAY['S', 'M', 'L', 'XL']
),

-- Sets Collection
(
  'Nargis coordinated Set',
  'nargis-coordinated-set',
  'Set outfit serasi atasan dan bawahan. Cocok untuk tampil kompak tanpa ribet mix and match.',
  275000,
  350000,
  ARRAY[
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop'
  ],
  'sets',
  NULL,
  10,
  true,
  ARRAY['Sage', 'Dusty Pink'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Casual Coord Set',
  'casual-coord-set',
  'Set casual yang nyaman untuk daily wear. Atasan loose dan bawahan elastic waist untuk kenyamanan maksimal.',
  195000,
  250000,
  ARRAY[
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop'
  ],
  'sets',
  NULL,
  14,
  false,
  ARRAY['Cream', 'Light Brown'],
  ARRAY['S', 'M', 'L', 'XL']
),
(
  'Elegant Set with Inner',
  'elegant-set-with-inner',
  'Set elegan lengkap dengan inner. Desain sophisticated untuk acara spesial.',
  320000,
  400000,
  ARRAY[
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop'
  ],
  'sets',
  NULL,
  6,
  true,
  ARRAY['Navy', 'Black'],
  ARRAY['S', 'M', 'L', 'XL']
);
