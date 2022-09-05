import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Modal,
} from '@mantine/core';
import { NavbarSimple } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { AuthenticationForm } from './AuthForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SHOW_LOGIN } from './state/State';

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [showLogin, setShowLogin] = useRecoilState(SHOW_LOGIN);
  return (
    <>
    <Modal centered opened={showLogin} onClose={() => setShowLogin(!showLogin)}>
      <AuthenticationForm noPadding noShadow />
    </Modal>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        // <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <NavbarSimple opened={!opened}/>
      }
      // aside={
        //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //       <Text>Application sidebar</Text>
        //     </Aside>
        //   </MediaQuery>
        // }
        // footer={
          //   <Footer height={60} p="md">
          //     Application footer
          //   </Footer>
          // }
          header={
            <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
      >
      <Routes>
        <Route path='/' element={<Text>test</Text>}/>
        <Route path='/users' element={<Text>Usuarios</Text>}/>
        <Route path='/settings' element={<AuthenticationForm/>} />

      </Routes>
    </AppShell>
    </>
  );
}