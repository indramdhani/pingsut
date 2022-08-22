/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import brain from 'brain.js';

import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled, useTheme } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  border: 0,
}));

const IBU_JARI = 1;
const TELUNJUK = 2;
const KELINGKING = 3;
const NO_SELECTION = 0;

const playerChoiceText = (choice) => {
  return choice === IBU_JARI
    ? 'Ibu Jari'
    : choice === TELUNJUK
    ? 'Telunjuk'
    : choice === KELINGKING
    ? 'Kelingking'
    : '';
};

const Landing = (props) => {
  const theme = useTheme();
  const [playerChoice, setPlayerChoice] = useState(NO_SELECTION);
  const [aiChoice, setAiChoice] = useState(NO_SELECTION);
  const [counter, setCounter] = useState(0);
  const [pattern, setPattern] = useState([]);

  const playerChoiceOnClick = async (choice) => {
    setPlayerChoice(choice);
    setCounter(counter + 1);
    await calculateAiChoice();
  };

  const preparePattern = () => {
    if (pattern.length < 1) {
      pattern.push(Math.floor(Math.random() * 3) + 1);
    }
  };

  const calculateAiChoice = async () => {
    preparePattern();
    const net = new brain.recurrent.LSTMTimeStep();
    net.train([this.pattern], { iterations: 100, log: true });
    const humanWillChose = net.run(this.pattern);
    console.log(humanWillChose);
    this.updatePattern();
    const roundedHumanWillChose = Math.round(humanWillChose);
    console.log('human will chose: ' + roundedHumanWillChose);
    this.chosenByAI =
      1 <= roundedHumanWillChose && roundedHumanWillChose <= 3
        ? (roundedHumanWillChose % 3) + 1
        : 1;
  };

  return (
    <Stack
      direction='row'
      divider={<Divider orientation='vertical' flexItem />}
      spacing={2}
      justifyContent='center'
    >
      <Card variant='outlined'>
        <CardContent sx={{ 'text-align': 'center' }}>
          <Typography variant='h2'>Batu Kertas Gunting</Typography>
          <Typography variant='subtitle1' gutterBottom>
            dengan Artificial Intelligence
          </Typography>
          <Typography variant='h4' gutterBottom color='text.secondary'>
            Papan Skor
          </Typography>
          <Stack
            gutterBottom
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
            spacing={2}
            justifyContent='center'
            sx={{ mb: theme.spacing(1) }}
          >
            <Card sx={{ minWidth: 150 }} variant='outlined'>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  0
                </Typography>
                <Typography variant='h6'>Player</Typography>
                <Typography color='text.secondary'>
                  {playerChoiceText(playerChoice)}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 150 }} variant='outlined'>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  0
                </Typography>
                <Typography variant='h6'>AI</Typography>
                <Typography color='text.secondary'>
                  {playerChoiceText(aiChoice)}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
          <Typography variant='h4' gutterBottom color='text.secondary'>
            Mulai Permainan
          </Typography>
          <Stack
            gutterBottom
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
            spacing={2}
            justifyContent='center'
            sx={{ mb: theme.spacing(1) }}
          >
            <Button
              variant='contained'
              size='medium'
              onClick={() => {
                playerChoiceOnClick(IBU_JARI);
              }}
            >
              Ibu Jari
            </Button>
            <Button
              variant='contained'
              size='medium'
              onClick={() => {
                playerChoiceOnClick(TELUNJUK);
              }}
            >
              Telunjuk
            </Button>
            <Button
              variant='contained'
              size='medium'
              onClick={() => {
                playerChoiceOnClick(KELINGKING);
              }}
            >
              Kelingking
            </Button>
          </Stack>
          <Typography variant='h5' color='text.secondary'>
            Jumlah permainan: {counter}
          </Typography>
        </CardContent>
      </Card>
      <Card variant='outlined'>
        <CardContent sx={{ 'text-align': 'left' }}>
          <Typography variant='h2' gutterBottom>
            Cara bermain
          </Typography>
          <Typography variant='body'>
            - Pilih jari "ibu jari", "telunjuk", "kelingking" untuk memulai
            permainan
          </Typography>
          <br />
          <Typography variant='body'>
            - Teruskan permainan sampai terbentuk pola dan AI akan mulai menang
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

Landing.propTypes = {};

export default Landing;
