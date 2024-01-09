import { renderWithProviders, within, fireEvent } from 'test-utils';
import Attendance from '../attendance';

test('renders Attendance', () => {
  const { getByRole, getAllByRole } = renderWithProviders(<Attendance />);
  const dataGridContainer = getByRole('grid');
  const rows = getAllByRole('row');
  const headerCells = getAllByRole('columnheader');
  const selectElements = getAllByRole('combobox');
  expect(dataGridContainer).toBeInTheDocument();
  expect(rows.length).toBe(6); // 5 rows + 1 header row
  expect(headerCells.length).toBe(2); // 2 columns
  expect(selectElements.length).toBe(5);
});

describe('validate backup updates on attendance change', () => {
  test('when (Severeus Snape, Horace Slughorn) is absent', () => {
    let teacherCombo;
    const { store, getByTestId, getByRole: parentGetByRole } = renderWithProviders(<Attendance />);
    teacherCombo = within(getByTestId('snape')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('slughorn')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    const { attendance: { backup } } = store.getState();
    expect(backup['Severus Snape']).toBe('Rubeus Hagrid');
    expect(backup['Horace Slughorn']).toBe('Rubeus Hagrid');
  });

  test('when (Severeus Snape, Horace Slughorn, Rubeus Hagrid) is absent', () => {
    let teacherCombo;
    const { store, getByTestId, getByRole: parentGetByRole } = renderWithProviders(<Attendance />);
    teacherCombo = within(getByTestId('snape')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('slughorn')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('hagrid')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    const { attendance: { backup } } = store.getState();
    expect(backup['Severus Snape']).toBe('Minerva McGonagall');
    expect(backup['Horace Slughorn']).toBe('Minerva McGonagall');
    expect(backup['Rubeus Hagrid']).toBe('Minerva McGonagall');
  });

  test('when (Severeus Snape, Horace Slughorn, Rubeus Hagrid, Minerva McGonagall) is absent', () => {
    let teacherCombo;
    const { store, getByTestId, getByRole: parentGetByRole } = renderWithProviders(<Attendance />);
    teacherCombo = within(getByTestId('snape')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('slughorn')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('hagrid')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('mcgonagall')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    const { attendance: { backup } } = store.getState();
    expect(backup['Severus Snape']).toBe('Professor Dumbledore');
    expect(backup['Horace Slughorn']).toBe('Professor Dumbledore');
    expect(backup['Rubeus Hagrid']).toBe('Professor Dumbledore');
    expect(backup['Minerva McGonagall']).toBe('Professor Dumbledore');
  });

  test('when (Severeus Snape, Horace Slughorn, Rubeus Hagrid, Minerva McGonagall, Professor Dumbledore) is absent', () => {
    let teacherCombo;
    const { store, getByTestId, getByRole: parentGetByRole } = renderWithProviders(<Attendance />);
    teacherCombo = within(getByTestId('snape')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('slughorn')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('hagrid')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('mcgonagall')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    teacherCombo = within(getByTestId('dumbledore')).getByRole('combobox');
    fireEvent.mouseDown(teacherCombo);
    fireEvent.click(within(parentGetByRole('listbox')).getByText(/Absent/i));
    const { attendance: { backup } } = store.getState();
    expect(backup['Severus Snape']).toBe('Not Assigned');
    expect(backup['Horace Slughorn']).toBe('Not Assigned');
    expect(backup['Rubeus Hagrid']).toBe('Not Assigned');
    expect(backup['Minerva McGonagall']).toBe('Not Assigned');
    expect(backup['Professor Dumbledore']).toBe('Not Assigned');
  });
});