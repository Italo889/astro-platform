import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Counter from '../components/Counter';

describe('Counter component', () => {
  it('renders count', () => {
    render(<Counter />);
    expect(screen.getByText(/count/i)).toBeInTheDocument();
  });
});