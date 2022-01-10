import Head from 'next/head'
import { useState } from 'react';

export default function Home(props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const calculateCarbon = async event => {
    event.preventDefault();

    setLoading(true);

    const url = 'api/calculator';
    const params = new URLSearchParams({ website: event.target.website.value }).toString();

    const urlWithWebsite = url + '?' + params;

    const res = await fetch(urlWithWebsite);
    const result = await res.json();

    setLoading(false);
    setResult(result);
  }

  const parseResult = co2PerPageView => {
    return Math.round(co2PerPageView * 100) / 100;
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Carbon Website Calculator
        </h1>

        <form onSubmit={calculateCarbon}>
          <input disabled={loading} name='website' type='text' required />
          <button disabled={loading}>Count</button>
        </form>

        {loading && 'Loading...'}

        {result && (
          <>
          <p>Ilość węgla tworzonego przy każdym wejściu na stronę:</p>
          <h3>{parseResult(result.co2PerPageview)}g CO2</h3>
          </>
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}