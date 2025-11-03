import '@/styles/globals.css';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store/store';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Fotter';
import { useEffect } from 'react';
import { auth } from '@/firebase/firebase';
import { login, logout } from '@/Feature/Userslice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            name: authUser.displayName,
            email: authUser.email,
            phoneNumber: authUser.phoneNumber,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthListener />
      <div className="bg-white">
        <ToastContainer />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  );
}
