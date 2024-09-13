// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/faviconsss.ico" />
        </Head>
        <body>
          <div id="root">
            <Main />
          </div>
          <NextScript />
          <div id="fb-root"></div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                        (function(d, s, id){
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) return;
                            js = d.createElement(s); js.id = id;
                            js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v19.0';
                            js.async = true; js.defer = true; js.crossOrigin = 'anonymous';
                            fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));
                    `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
