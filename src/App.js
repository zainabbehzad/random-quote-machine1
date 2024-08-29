import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [pageBackgroundColor, setPageBackgroundColor] = useState('');
  const [buttonColor, setButtonColor] = useState('');

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      const quotesData = response.data.quotes;
      const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];

      setQuote(`"${randomQuote.quote}"`);
      setAuthor(randomQuote.author);
      setPageBackgroundColor(getRandomColor());
      setButtonColor(getRandomColor());
    } catch (error) {
      alert('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      id="root"
      style={{
        backgroundColor: pageBackgroundColor,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id="quote-box"
        className="center"
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div id="text">{quote}</div>
        <div id="author">
          -
          {author}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <button
            id="new-quote"
            onClick={fetchQuote}
            style={{
              backgroundColor: buttonColor,
              color: 'white',
              border: '1px solid #000',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            type="button"
            aria-label="New Quote"
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: buttonColor,
              color: 'white',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #000',
            }}
            aria-label="Tweet this quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
