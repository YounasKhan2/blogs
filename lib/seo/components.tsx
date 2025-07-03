/**
 * SEO Components
 * React components for SEO optimization
 */

import { StructuredDataGenerator, type StructuredDataConfig } from './structured-data';
import { type PageMetadata } from './metadata-generator';

interface StructuredDataProps {
  schemas: StructuredDataConfig[];
}

/**
 * Structured Data Script Component
 */
export function StructuredDataScript({ schemas }: StructuredDataProps) {
  const structuredData = StructuredDataGenerator.generateMultipleSchemas(schemas);
  
  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
    </>
  );
}

/**
 * Article Structured Data Component
 */
export function ArticleStructuredData({ pageData }: { pageData: PageMetadata }) {
  const schemas: StructuredDataConfig[] = [
    { type: 'organization', data: {} },
    { type: 'article', data: pageData }
  ];
  
  return <StructuredDataScript schemas={schemas} />;
}

/**
 * Homepage Structured Data Component
 */
export function HomepageStructuredData() {
  const schemas: StructuredDataConfig[] = [
    { type: 'organization', data: {} },
    { type: 'website', data: {} },
    { type: 'blog', data: {} }
  ];
  
  return <StructuredDataScript schemas={schemas} />;
}

/**
 * FAQ Structured Data Component
 */
export function FAQStructuredData({ 
  faqs 
}: { 
  faqs: Array<{ question: string; answer: string }> 
}) {
  const schemas: StructuredDataConfig[] = [
    { type: 'faq', data: faqs }
  ];
  
  return <StructuredDataScript schemas={schemas} />;
}

/**
 * Product Review Structured Data Component
 */
export function ProductReviewStructuredData({ 
  product,
  review 
}: { 
  product: any;
  review: any;
}) {
  const schemas: StructuredDataConfig[] = [
    { type: 'product', data: product },
    { type: 'review', data: review }
  ];
  
  return <StructuredDataScript schemas={schemas} />;
}
