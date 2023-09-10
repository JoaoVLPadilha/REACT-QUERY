import { render, screen } from '@testing-library/react';

import { Treatments } from '../Treatments';
import { renderWithQueryClient } from 'test-utils';

test('renders response from query', async () => {
  renderWithQueryClient(<Treatments/>)

  const treatment = await screen.findAllByRole('heading', {name: /massage|scrub|facial/i})
  expect(treatment).toHaveLength(3)
});
