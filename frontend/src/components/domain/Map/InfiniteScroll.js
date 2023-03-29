import React, { useState, useEffect } from 'react';

function InfiniteScroll({ data }) {
  const [items, setItems] = useState([data]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setItems((prevItems) => [
          ...prevItems,
          { id: prevItems.length + 1, name: `Item ${prevItems.length + 1}` },
        ]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {' '}
      {items && (
        <div>
          {items.map((item, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'white',
                  width: '200px',
                  height: '400px',
                  border: 'solid 1px black',
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default InfiniteScroll;
