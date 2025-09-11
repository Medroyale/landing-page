type SeoProps = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogImageAlt?: string
  siteName?: string
  robots?: string
}

export default function Seo({
  title = "MedRoyale | The first competitive 1v1 quiz game designed for the UKMLA",
  description = "MedRoyale The first competitive 1v1 quiz game designed for the UKMLA.",
  canonical = "https://medroyale.co.uk",
  ogImage = "https://medroyale.co.uk/og-image.png",
  ogImageAlt = "MedRoyale preview image",
  siteName = "MedRoyale",
  robots = "index, follow",
}: SeoProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}


