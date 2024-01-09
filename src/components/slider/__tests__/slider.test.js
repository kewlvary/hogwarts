import { renderWithProviders, fireEvent } from 'test-utils';
import Slider from '../slider';
import { initialState } from '../../attendance/attendanceSlice';

test('renders Slider', () => {
  const { getByTestId } = renderWithProviders(<Slider />);
  const teacherSlider = getByTestId('teacherSlider');
  const name = getByTestId('name');
  const next = getByTestId('next');
  const prev = getByTestId('prev');
  expect(teacherSlider).toBeInTheDocument();
  expect(name.textContent).toBe('Professor Dumbledore');
  fireEvent.click(next);
  expect(name.textContent).toBe('Minerva McGonagall');
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  expect(name.textContent).toBe('Professor Dumbledore');
  fireEvent.click(prev);
  expect(name.textContent).toBe('Severus Snape');
});

test('When (Professor Dumbledore) is absent', () => {
  const state = {
    ...initialState,
    rows: initialState.rows.map((row, i) => {
      if (!i) return { ...row, attendance: 'Absent' };
      return row
    }),
    backup: {
      ...initialState.backup,
      'Professor Dumbledore': 'Not Assigned'
    }
  };
  const { getByTestId } = renderWithProviders(<Slider />, {
    preloadedState: {
      attendance: state
    }
  });

  const name = getByTestId('name');
  expect(name.textContent).toBe('Professor Dumbledore');

  const status = getByTestId('status');
  expect(status.textContent).toContain('Absent');

  const backup = getByTestId('backup');
  expect(backup).toBeInTheDocument();
  expect(backup.textContent).toContain('Not Assigned');
});

