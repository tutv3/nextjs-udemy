import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlay" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
