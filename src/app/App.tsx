import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';
import { AuthProvider } from './auth';
const queryClient=new QueryClient({defaultOptions:{queries:{staleTime:30_000,retry:1}}});
export default function App(){return <QueryClientProvider client={queryClient}><AuthProvider><RouterProvider router={router}/></AuthProvider><Toaster position="top-right" toastOptions={{duration:3200}}/></QueryClientProvider>}
