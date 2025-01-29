-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'listing-images');

-- Allow public to view images
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'listing-images');
