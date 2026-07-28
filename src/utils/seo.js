export function generatePersonJsonLd(hero) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: hero.name,
    jobTitle: hero.title,
    description: hero.shortBio,
    email: hero.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: hero.location
    },
    sameAs: [
      hero.githubUrl,
      hero.linkedinUrl
    ].filter(Boolean)
  });
}

export function updateMetaTags({ title, description, image, url }) {
  document.title = title;

  const setMeta = (nameAttr, attrVal, contentVal) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
  };

  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  if (image) setMeta('property', 'og:image', image);
  if (url) setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  if (image) setMeta('name', 'twitter:image', image);
}