/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { init, track, trackPages, parameters } from "insights-js";
import { styled, useTheme } from "@mui/material/styles";

init(process.env.REACT_APP_TRACKING);
trackPages();
window.umami.trackView("/");

const Card = styled(MuiCard)(({ theme }) => ({
  border: 0,
}));

const IBU_JARI = 1;
const TELUNJUK = 2;
const KELINGKING = 3;
const NO_SELECTION = 0;

const playerChoiceText = (choice) => {
  return choice === IBU_JARI
    ? "Ibu Jari"
    : choice === TELUNJUK
    ? "Telunjuk"
    : choice === KELINGKING
    ? "Kelingking"
    : "";
};

const Landing = (props) => {
  const theme = useTheme();
  const [playerChoice, setPlayerChoice] = useState(NO_SELECTION);
  const [aiChoice, setAiChoice] = useState(NO_SELECTION);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [winner, setWinner] = useState("");

  const sendEvent = (selected) => {
    window.umami.trackEvent("user-choice", { choice: selected });
    window.umami.trackEvent(`user-choice-${playerChoiceText(selected)}`, {
      choice: selected,
    });

    track({
      id: "user-choice",
      parameters: {
        choice: selected,
      },
    });
  };

  const playerChoiceOnClick = async (choice) => {
    sendEvent(choice);
    setPlayerChoice(choice);
    const tempAiChoice = await calculateAiChoice();
    setAiChoice(tempAiChoice);
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (playerChoice) {
      checkTheWinner();
    }
  }, [counter]);

  const checkTheWinner = () => {
    console.log("check winner effects");
    console.log("human choice:" + playerChoiceText(playerChoice));
    console.log("AI choice:" + playerChoiceText(aiChoice));
    console.log("---");

    if (playerChoice === aiChoice) {
      setWinner("draw");
    } else if (
      (playerChoice === IBU_JARI && aiChoice === TELUNJUK) ||
      (playerChoice === TELUNJUK && aiChoice === KELINGKING) ||
      (playerChoice === KELINGKING && aiChoice === IBU_JARI)
    ) {
      setWinner("human");
      setPlayerScore(playerScore + 1);
    } else {
      setWinner("AI");
      setAiScore(aiScore + 1);
    }
  };

  const preparePattern = () => {
    if (pattern.length < 1) {
      console.log("preparePattern");
      for (let index = 1; index <= 10; index++) {
        pattern.push(Math.floor(Math.random() * 3) + 1);
      }
    }
  };

  const updatePattern = () => {
    if (counter !== 0) {
      pattern.shift();
      pattern.push(playerChoice);
    }
  };

  const calculateAiChoice = async () => {
    preparePattern();
    const net = new window.brain.recurrent.LSTMTimeStep();
    net.train([pattern], { iterations: 100, log: true });
    const humanWillChose = net.run(pattern);
    if (playerChoice !== NO_SELECTION) {
      updatePattern();
    }
    const roundedHumanWillChose = Math.round(humanWillChose);
    console.log("human will chose: " + playerChoiceText(roundedHumanWillChose));
    return roundedHumanWillChose === IBU_JARI
      ? KELINGKING
      : roundedHumanWillChose === TELUNJUK
      ? IBU_JARI
      : TELUNJUK;
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      justifyContent="center"
    >
      <Card variant="outlined">
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h2">{process.env.REACT_APP_TITLE}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            dengan Artificial Intelligence
          </Typography>
          <Typography variant="h4" gutterBottom color="text.secondary">
            Papan Skor
          </Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            justifyContent="center"
            sx={{ mb: theme.spacing(1) }}
          >
            <Card sx={{ minWidth: 150 }} variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {playerScore}
                </Typography>
                <Typography variant="h6">Player</Typography>
                <Typography color="text.secondary">
                  {playerChoiceText(playerChoice)}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 150 }} variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {aiScore}
                </Typography>
                <Typography variant="h6">AI</Typography>
                <Typography color="text.secondary">
                  {playerChoiceText(aiChoice)}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
          <Typography variant="h4" gutterBottom color="text.secondary">
            Mulai Permainan
          </Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            justifyContent="center"
            sx={{ mb: theme.spacing(1) }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={async () => {
                await playerChoiceOnClick(IBU_JARI);
              }}
            >
              Ibu Jari
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={async () => {
                await playerChoiceOnClick(TELUNJUK);
              }}
            >
              Telunjuk
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={async () => {
                await playerChoiceOnClick(KELINGKING);
              }}
            >
              Kelingking
            </Button>
          </Stack>
          <Typography variant="h5" color="text.secondary">
            Pemenang: {winner}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Jumlah permainan: {counter}
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent sx={{ textAlign: "left" }}>
          <Typography variant="h3" gutterBottom>
            Cara
            <br />
            bermain
          </Typography>
          <Typography variant="body">
            - Pilih jari "ibu jari", "telunjuk", "kelingking"
            <br />
            untuk memulai permainan
          </Typography>
          <br />
          <Typography variant="body" gutterBottom>
            - Teruskan permainan
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ marginTop: theme.spacing(4) }}
          >
            Temukan Kodenya di
          </Typography>
          <Link href="https://github.com/indramdhani/pingsut">Github</Link>
          <br />
          dengan menggunakan library:{" "}
          <Link href="https://brain.js.org/#/">Brain.js</Link>
          <br />
          mengambil ide dari:{" "}
          <Link href="https://rockpaperscissors-ai.vercel.app/">
            RockPaperScissors
          </Link>
        </CardContent>
      </Card>
    </Stack>
  );
};

Landing.propTypes = {};

export default Landing;
