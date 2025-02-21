import { Box } from '@mui/material';
import Todo from './components/Todo';
import imagemFundo from './assets/imagem.png';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backgroundImage: `url(${imagemFundo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Todo />
      </Box>
    </>
  );
}

export default App;
