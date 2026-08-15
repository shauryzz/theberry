/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Added: with trailingSlash false (the default), static export writes
  // about.html AND an about/ folder as siblings — Apache resolves /about
  // to the folder (no index.html inside), not the file, giving 403 on any
  // hard refresh even though client-side nav works fine. trailingSlash:
  // true makes every route export as about/index.html instead, which IS
  // what Apache's default DirectoryIndex expects — no folder/file
  // collision, no rewrite rules needed.
  trailingSlash: true,
};

export default nextConfig;
