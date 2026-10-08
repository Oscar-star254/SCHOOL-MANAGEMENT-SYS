import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge, Button } from './ui';
describe('EduNest design primitives',()=>{it('renders accessible button and semantic badge',()=>{render(<><Button>Save learner</Button><Badge tone="success">Active</Badge></>);expect(screen.getByRole('button',{name:'Save learner'})).toBeVisible();expect(screen.getByText('Active')).toHaveClass('badge-success')})});
