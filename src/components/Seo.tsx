type SeoProps = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export default function Seo({
  title = "MedRoyale",
  description = "MedRoyale marketing site.",
  canonical = "https://medroyale.co.uk/",
  ogImage = "https://medroyale.co.uk/og-image.png",
}: SeoProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}


