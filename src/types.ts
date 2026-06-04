export interface Product {
  id: string;
  name: string;
  category: string;
  packSize: string;
  image: string;
  description: string;
  features: string[];
  isBestSeller?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface InquiryFormData {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  productRequirement: string;
  quantity: string;
  message: string;
  paymentStatus?: 'pending' | 'success';
  utrNumber?: string;
  totalAmount?: number;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}
