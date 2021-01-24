import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import Router from 'next/router';

const withAuth = (Component) => (props) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (!supabase.auth.session()) {
      Router.replace('/');
    } else {
      setRender(true);
    }
  }, []);
  return render && <Component {...props} />;
};

export default withAuth;
