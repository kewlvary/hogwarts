import { renderWithProviders } from 'test-utils';
import Schedule from '../schedule';
import { initialState } from '../../attendance/attendanceSlice';

test('renders Schedule', () => {
  const { getByRole, getAllByRole } = renderWithProviders(<Schedule />);
  const dataGridContainer = getByRole('grid');
  const rows = getAllByRole('row');
  const headerCells = getAllByRole('columnheader');
  expect(dataGridContainer).toBeInTheDocument();
  expect(rows.length).toBe(7); // 6 rows + 1 header row
  expect(headerCells.length).toBe(3); // 2 columns
});

describe('validate backup teacher is assigned to students when some teacher is absent', () => {
  test('When (Severus Snape, Horace Slughorn) is absent', () => {
    const state = {
      ...initialState,
      backup: {
        ...initialState.backup,
        'Severus Snape': 'Rubeus Hagrid',
        'Horace Slughorn': 'Rubeus Hagrid'
      }
    };
    const { queryByRole } = renderWithProviders(<Schedule />, {
      preloadedState: {
        attendance: state
      }
    });

    const harry = queryByRole('row', { name: /Harry/i });
    expect(harry.textContent).toContain('Hagrid');

    const ron = queryByRole('row', { name: /Ron/i });
    expect(ron.textContent).toContain('Hagrid');

    const draco = queryByRole('row', { name: /Draco/i });
    expect(draco.textContent).toContain('Hagrid');

    const luna = queryByRole('row', { name: /Luna/i });
    expect(luna.textContent).toContain('Hagrid');
  });

  test('When (Severus Snape, Horace Slughorn, Rubeus Hagrid) is absent', () => {
    const state = {
      ...initialState,
      backup: {
        ...initialState.backup,
        'Severus Snape': 'Minerva McGonagall',
        'Horace Slughorn': 'Minerva McGonagall',
        'Rubeus Hagrid': 'Minerva McGonagall'
      }
    };
    const { queryByRole } = renderWithProviders(<Schedule />, {
      preloadedState: {
        attendance: state
      }
    });

    const harry = queryByRole('row', { name: /Harry/i });
    expect(harry.textContent).toContain('McGonagall');

    const hermione = queryByRole('row', { name: /Hermione/i });
    expect(hermione.textContent).toContain('McGonagall');

    const ron = queryByRole('row', { name: /Ron/i });
    expect(ron.textContent).toContain('McGonagall');

    const draco = queryByRole('row', { name: /Draco/i });
    expect(draco.textContent).toContain('McGonagall');

    const padma = queryByRole('row', { name: /Padma/i });
    expect(padma.textContent).toContain('McGonagall');

    const luna = queryByRole('row', { name: /Luna/i });
    expect(luna.textContent).toContain('McGonagall');
  });

  test('When (Severus Snape, Horace Slughorn, Rubeus Hagrid, Minerva McGonagall) is absent', () => {
    const state = {
      ...initialState,
      backup: {
        ...initialState.backup,
        'Severus Snape': 'Professor Dumbledore',
        'Horace Slughorn': 'Professor Dumbledore',
        'Rubeus Hagrid': 'Professor Dumbledore',
        'Minerva McGonagall': 'Professor Dumbledore'
      }
    };
    const { queryByRole } = renderWithProviders(<Schedule />, {
      preloadedState: {
        attendance: state
      }
    });

    const harry = queryByRole('row', { name: /Harry/i });
    expect(harry.textContent).toContain('Dumbledore');

    const hermione = queryByRole('row', { name: /Hermione/i });
    expect(hermione.textContent).toContain('Dumbledore');

    const ron = queryByRole('row', { name: /Ron/i });
    expect(ron.textContent).toContain('Dumbledore');

    const draco = queryByRole('row', { name: /Draco/i });
    expect(draco.textContent).toContain('Dumbledore');

    const padma = queryByRole('row', { name: /Padma/i });
    expect(padma.textContent).toContain('Dumbledore');

    const luna = queryByRole('row', { name: /Luna/i });
    expect(luna.textContent).toContain('Dumbledore');
  });

  test('When (All teachers) are absent', () => {
    const state = {
      ...initialState,
      backup: {
        ...initialState.backup,
        'Severus Snape': 'Not Assigned',
        'Horace Slughorn': 'Not Assigned',
        'Rubeus Hagrid': 'Not Assigned',
        'Minerva McGonagall': 'Not Assigned',
        'Professor Dumbledore': 'Not Assigned'
      }
    };
    const { queryByRole } = renderWithProviders(<Schedule />, {
      preloadedState: {
        attendance: state
      }
    });

    const harry = queryByRole('row', { name: /Harry/i });
    expect(harry.textContent).toContain('Not Assigned');

    const hermione = queryByRole('row', { name: /Hermione/i });
    expect(hermione.textContent).toContain('Not Assigned');

    const ron = queryByRole('row', { name: /Ron/i });
    expect(ron.textContent).toContain('Not Assigned');

    const draco = queryByRole('row', { name: /Draco/i });
    expect(draco.textContent).toContain('Not Assigned');

    const padma = queryByRole('row', { name: /Padma/i });
    expect(padma.textContent).toContain('Not Assigned');

    const luna = queryByRole('row', { name: /Luna/i });
    expect(luna.textContent).toContain('Not Assigned');
  });
});