import { QueryClient } from '@tanstack/react-query';
import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}



const logvar = {
  log: console.log,
  warn: console.log,
  error: () => {}
}
// to satisfy typescript until this file has uncommented contents
export function generateQueryClient(consologConfig:boolean): QueryClient {
  return new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
  logger: consologConfig ? logvar : null

});
}

export const queryClient = generateQueryClient(false)