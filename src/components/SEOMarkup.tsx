import { useEffect } from 'react';

export default function SEOMarkup() {
  useEffect(() => {
    // Generate LocalBusiness Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "FRUTELLI COMPANY GHANA",
      "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
      "telephone": "050 933 5623",
      "url": window.location.origin,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Accra",
        "addressCountry": "GH",
        "streetAddress": "HR53+P28, Accra, Ghana"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "5.6037",
        "longitude": "-0.1870"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:30",
        "closes": "18:00"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "8",
        "bestRating": "5"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Nathan Fritz"
          },
          "reviewBody": "Your delivery process is simple and I really love the payment method thanks."
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Duku Prince"
          },
          "reviewBody": "Great job guys keep it up."
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Tetteh"
          },
          "reviewBody": "Nice juice."
        }
      ]
    };

    // Inject metadata description and keywords dynamically securely
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Frutelli Company Ghana is a trusted juice manufacturer in Accra offering fresh, delicious juice, simple ordering, easy payment, quick delivery, and premium bulk supply for events, offices, and distributors.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Frutelli Company Ghana is a trusted juice manufacturer in Accra offering fresh, delicious juice, simple ordering, easy payment, quick delivery, and premium bulk supply for events, offices, and distributors.";
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "Fruit juice company in Ghana, Juice manufacturer in Accra, Fresh juice in Accra, Juice delivery in Accra, Ghana fruit juice manufacturer, Bulk juice supply Ghana, Juice company near me, Frutelli Company Ghana";
      document.head.appendChild(meta);
    }

    // Set page title
    document.title = "Frutelli Company Ghana | Fresh Juice Manufacturer in Accra";

    // Set JSON-LD Schema
    const scriptId = 'frutelli-local-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);

    return () => {
      // Keep script loaded for SEO, but can clean up if desired.
    };
  }, []);

  return null;
}
