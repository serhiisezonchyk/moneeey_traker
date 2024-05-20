import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Money?!',
    short_name: 'Money?!',
    description:
      'Hey, here you can manage your expenses easily👋 Just sign in (Or sign up if you don`t have one) and start!',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    screenshots: [
      {
        src: '/screenshot-small.png',
        type: 'image/png',
        sizes: '734x1620',
      },
    ],
    shortcuts: [
      {
        name: 'Check transacions',
        short_name: 'Transactions',
        description: 'View table with your latest transactions',
        url: '/transactions',
      },
      {
        name: 'Manage',
        short_name: 'Manage',
        description: 'Manage your accounts` settings',
        url: '/manage',
      },
    ],
  };
}
