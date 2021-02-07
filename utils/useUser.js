import { useLayoutEffect, useState } from 'react';

export default function useUser(checkRender = false, setRender = false) {
  const [user, setUser] = useState({});

  useLayoutEffect(() => {
    fetch('/api/getUser')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
        if (checkRender) setRender(true);
      });
  }, []);

  return user;
}
