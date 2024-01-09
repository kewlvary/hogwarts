
import { useEffect } from 'react';
import './App.css';
import { Attendance, Schedule, Slider } from './components';
import { styled } from '@mui/material/styles';
import { Grid, Divider } from '@mui/material';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import soundUrl from './assets/harry_potter_theme.mp3';

const Header = styled(Grid)(({ theme }) => ({
  margin: '5%',
  background: 'white',
  opacity: '0.8',
  ...theme.typography.h4,
}));

function App() {
  const { load } = useGlobalAudioPlayer();

  useEffect(() => {
    load(soundUrl, {
      autoplay: true,
      loop: true
    });
  }, [load]);

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} md={6} sx={{ minWidth: 450 }}>
          <Header>
            Attendance
          </Header>
          <Attendance />
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            background: 'white',
            opacity: '0.8',
            position: 'absolute',
            left: '50%',
            height: 580
          }}
        />
        <Grid item xs={12} md={6} sx={{ minWidth: 450 }}>
          <Header>
            Current Schedule
          </Header>
          <Schedule />
        </Grid>
      </Grid>
      <div className='slider'><Slider /></div>
    </div >
  );
}

export default App;
