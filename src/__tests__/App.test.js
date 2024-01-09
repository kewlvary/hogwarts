import { renderWithProviders, screen } from 'test-utils';
import App from '../App';
import { Attendance, Schedule, Slider } from '../components';

jest.mock('../components');

test('renders App without crashing', () => {
  Attendance.mockImplementation(() => <div>AttendanceGrid</div>);
  Schedule.mockImplementation(() => <div>ScheduleGrid</div>);
  Slider.mockImplementation(() => <div>Slider</div>)
  renderWithProviders(<App />);
  expect(screen.getByText('Attendance')).toBeInTheDocument();
  expect(screen.getByText(/AttendanceGrid/i)).toBeInTheDocument();
  expect(screen.getByText(/ScheduleGrid/i)).toBeInTheDocument();
  expect(screen.getByText(/Slider/i)).toBeInTheDocument();
});