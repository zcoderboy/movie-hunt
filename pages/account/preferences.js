import withAuth from '../../components/withAuth';
import supabase from '../../lib/supabaseClient';

const Preferences = () => {
  return <h1>Preferences</h1>;
};

export default withAuth(Preferences);
