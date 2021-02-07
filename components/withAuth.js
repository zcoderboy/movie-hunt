import React, { useEffect, useState } from 'react';
const withAuth = (Component) => (props) => {
  const [render, setRender] = useState(false);
  async function getUser() {
    const response = await fetch('/api/getUser');
    if (response.ok) {
      return await response.json();
    }
  }
  useEffect(() => {
    getUser().then((data) => {
      if (data) {
        setRender(true);
      } else {
        window.location.href = '/';
      }
    });
  }, []);
  return render && <Component {...props} />;
};

export default withAuth;
