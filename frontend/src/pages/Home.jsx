import { useSelector, useDispatch } from 'react-redux';
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return <div>Hello {user.name}</div>;
};
export default Home;
