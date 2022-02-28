import Document, { Html, Head, Main, NextScript } from 'next/document'

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* safari */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='#000' />
          <meta name='apple-mobile-web-app-title' content='myapp' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon-180x180.png'
          />
          {/* 一般 */}
          <meta name='application-name' content='myapp' />
          <meta name='theme-color' content='#000' />
          <meta name='description' content='this is myapp' />
          <link rel='icon' sizes='192x192' href='/icon-192x192.png' />
          <link rel='icon' href='/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
