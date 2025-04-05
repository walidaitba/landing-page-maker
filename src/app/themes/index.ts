import { Section } from '@/app/types/sections';

export type Theme = {
  id: string;
  name: string;
  description: string;
  preview: string;
  sections: Section[];
};

export const themes: Theme[] = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'A clean and professional theme perfect for business services',
    preview: '/themes/modern-business.jpg',
    sections: [
      {
        id: '1',
        type: 'hero',
        title: 'Hero Section',
        content: 'Transform Your Business with Innovation',
        description: 'Elevate your business with cutting-edge solutions that drive growth and efficiency.',
        isActive: true,
        order: 0,
        shape: 'wave',
        productImage: '/themes/modern-business-product.jpg',
        originalPrice: 299,
        newPrice: 199,
        currency: 'USD'
      },
      {
        id: '2',
        type: 'features',
        title: 'Features Section',
        content: 'Why Choose Us',
        isActive: true,
        order: 1,
        features: [
          {
            id: 'f1',
            title: 'Innovative Solutions',
            content: 'Stay ahead of the competition with our cutting-edge technology',
            imageUrl: '/themes/feature-1.jpg',
            imagePosition: 'left'
          },
          {
            id: 'f2',
            title: 'Expert Support',
            content: '24/7 dedicated support team to help you succeed',
            imageUrl: '/themes/feature-2.jpg',
            imagePosition: 'right'
          }
        ]
      }
    ]
  },
  {
    id: 'elegant-product',
    name: 'Elegant Product',
    description: 'A luxurious theme showcasing premium products',
    preview: '/themes/elegant-product.jpg',
    sections: [
      {
        id: '1',
        type: 'hero',
        title: 'Hero Section',
        content: 'Experience Luxury Redefined',
        description: 'Discover our premium collection crafted for those who appreciate excellence.',
        isActive: true,
        order: 0,
        shape: 'hexagon',
        productImage: '/themes/elegant-product-hero.jpg',
        originalPrice: 599,
        newPrice: 499,
        currency: 'USD'
      },
      {
        id: '2',
        type: 'slider',
        title: 'Product Gallery',
        content: 'Product Showcase',
        isActive: true,
        order: 1,
        slides: [
          {
            id: 's1',
            title: 'Premium Quality',
            description: 'Crafted with attention to detail',
            imageUrl: '/themes/slide-1.jpg'
          },
          {
            id: 's2',
            title: 'Elegant Design',
            description: 'Timeless beauty meets modern functionality',
            imageUrl: '/themes/slide-2.jpg'
          }
        ],
        autoplaySpeed: 4000
      }
    ]
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    description: 'A modern and dynamic theme for innovative tech companies',
    preview: '/themes/tech-startup.jpg',
    sections: [
      {
        id: '1',
        type: 'hero',
        title: 'Hero Section',
        content: 'Innovate. Disrupt. Transform.',
        description: 'Cutting-edge solutions for the digital age. Transform your ideas into reality.',
        isActive: true,
        order: 0,
        shape: 'circle',
        productImage: '/themes/tech-startup-hero.jpg',
        originalPrice: 399,
        newPrice: 299,
        currency: 'USD'
      },
      {
        id: '2',
        type: 'features',
        title: 'Features Section',
        content: 'Built for the Future',
        isActive: true,
        order: 1,
        features: [
          {
            id: 'f1',
            title: 'AI-Powered',
            content: 'Harness the power of artificial intelligence to drive growth',
            imageUrl: '/themes/tech-feature-1.jpg',
            imagePosition: 'left'
          },
          {
            id: 'f2',
            title: 'Cloud-Native',
            content: 'Scale effortlessly with cloud-first architecture',
            imageUrl: '/themes/tech-feature-2.jpg',
            imagePosition: 'right'
          }
        ]
      }
    ]
  },
  {
    id: 'eco-friendly',
    name: 'Eco Friendly',
    description: 'A sustainable theme for environmentally conscious brands',
    preview: '/themes/eco-friendly.jpg',
    sections: [
      {
        id: '1',
        type: 'hero',
        title: 'Hero Section',
        content: 'Sustainable Living, Better Future',
        description: 'Join us in creating a sustainable future with eco-friendly products that make a difference.',
        isActive: true,
        order: 0,
        shape: 'wave',
        productImage: '/themes/eco-friendly-hero.jpg',
        originalPrice: 199,
        newPrice: 149,
        currency: 'USD'
      },
      {
        id: '2',
        type: 'features',
        title: 'Our Impact',
        content: 'Making a Difference',
        isActive: true,
        order: 1,
        features: [
          {
            id: 'f1',
            title: 'Sustainable Materials',
            content: '100% eco-friendly materials sourced responsibly',
            imageUrl: '/themes/eco-feature-1.jpg',
            imagePosition: 'left'
          },
          {
            id: 'f2',
            title: 'Zero Waste',
            content: 'Committed to reducing environmental impact',
            imageUrl: '/themes/eco-feature-2.jpg',
            imagePosition: 'right'
          }
        ]
      }
    ]
  },
  {
    id: 'luxury-boutique',
    name: 'Luxury Boutique',
    description: 'An elegant theme for high-end boutiques and premium brands',
    preview: '/themes/luxury-boutique.jpg',
    sections: [
      {
        id: '1',
        type: 'hero',
        title: 'Hero Section',
        content: 'Timeless Elegance',
        description: 'Discover our curated collection of luxury items, where sophistication meets excellence.',
        isActive: true,
        order: 0,
        shape: 'hexagon',
        productImage: '/themes/luxury-boutique-hero.jpg',
        originalPrice: 899,
        newPrice: 699,
        currency: 'USD'
      },
      {
        id: '2',
        type: 'slider',
        title: 'Collection',
        content: 'Latest Collection',
        isActive: true,
        order: 1,
        slides: [
          {
            id: 's1',
            title: 'Handcrafted Excellence',
            description: 'Each piece tells a story of artisanal mastery',
            imageUrl: '/themes/luxury-slide-1.jpg'
          },
          {
            id: 's2',
            title: 'Premium Materials',
            description: 'Only the finest materials make the cut',
            imageUrl: '/themes/luxury-slide-2.jpg'
          }
        ],
        autoplaySpeed: 4000
      }
    ]
  }
];