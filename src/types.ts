/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'single' | 'event' | 'wholesale' | 'all' | string;
  ingredients: string[];
  volume: string;
  price: string;
  priceNumeric: number;
  badge?: string;
  imageAlt: string;
  imageUrl?: string;
  accentColor: string; 
  bgColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  location?: string;
  date?: string;
}

export interface BulkInquiry {
  name: string;
  organization: string;
  email: string;
  phone: string;
  estimatedQuantity: string;
  juiceSelection: string;
  additionalDetails: string;
}

export type ActiveTab = 'home' | 'about' | 'products' | 'bulk' | 'reviews' | 'contact';
