/** @jsxImportSource @emotion/react */
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

function CustomLink(props) {
  const theme = useTheme();
  return <Link css={{ marginRight: theme.spacing(1) }} {...props}></Link>;
}

function MailLink(props) {
  return (
    <Link
      css={{
        fontStyle: 'italic',
      }}
      {...props}
    ></Link>
  );
}

function Footer(props) {
  const theme = useTheme();
  return (
    <footer
      css={{
        marginTop: 'auto',
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'left',
        padding: theme.spacing(3, 2),
      }}
      {...props}
    />
  );
}

const GenerateDate = () => {
  return process.env.REACT_APP_LAUNCH_YEAR ===
    new Date().getFullYear().toString()
    ? new Date().getFullYear()
    : process.env.REACT_APP_LAUNCH_YEAR + ' - ' + new Date().getFullYear();
};

export default function StickyFooter() {
  const mailto = 'mailto:' + process.env.REACT_APP_HELLO_EMAIL;

  return (
    <Footer>
      <Container maxWidth='md'>
        <Typography>
          Share your opinion about <i>{process.env.REACT_APP_TITLE}</i> to{' '}
          <MailLink href={mailto} variant='body1' color='textSecondary'>
            {process.env.REACT_APP_HELLO_EMAIL}
          </MailLink>
        </Typography>
        <CustomLink href='/support' variant='body1' color='textSecondary'>
          Need a help
        </CustomLink>
        <CustomLink href='/donate' variant='body1' color='textSecondary'>
          Support us
        </CustomLink>
        <CustomLink
          href='/privacy-policy'
          variant='body1'
          color='textSecondary'
        >
          Privacy Policy
        </CustomLink>
        <CustomLink
          href='/terms-and-conditions'
          variant='body1'
          color='textSecondary'
        >
          Terms and Conditions
        </CustomLink>
        <CustomLink href='/disclaimer' variant='body1' color='textSecondary'>
          Disclaimer{' '}
        </CustomLink>
        <Typography>
          {'© '}
          <Link
            variant='body1'
            color='textSecondary'
            href={process.env.REACT_APP_FRONTEND_URL}
          >
            {process.env.REACT_APP_TITLE}
          </Link>{' '}
          <GenerateDate />
          {'.'} Icons made by{' '}
          <Link
            variant='body1'
            color='textSecondary'
            href='https://www.flaticon.com/authors/pixel-perfect'
            title='Pixel Perfect'
          >
            Pixel perfect
          </Link>{' '}
          from{' '}
          <Link
            variant='body1'
            color='textSecondary'
            href='https://www.flaticon.com/'
            title='Flaticon'
          >
            www.flaticon.com
          </Link>
        </Typography>
      </Container>
    </Footer>
  );
}
