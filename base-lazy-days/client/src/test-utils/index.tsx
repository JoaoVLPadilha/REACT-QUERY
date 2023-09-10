import { RenderResult, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactElement } from 'react';
// import { defaultQueryClientOptions } from '../react-query/queryClient';
import { generateQueryClient } from 'react-query/queryClient';

const createUniqueTestQueryClient = () => {
  const client =  generateQueryClient(true)
  const options = client.getDefaultOptions()
  options.queries = {...options.queries, retry: false}
  return client
};


export const renderWithQueryClient = (
  ui: ReactElement,
  client?: QueryClient,
): RenderResult => {
  const queryClient = client ?? createUniqueTestQueryClient();

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
};

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createQueryClientWrapper = (): React.FC => {
//   const queryClient = createUniqueTestQueryClient;
//   return ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };
