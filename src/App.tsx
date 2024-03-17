import { ReactElement, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Group,
  SimpleCell,
  usePlatform
} from '@vkontakte/vkui';
import Button from './components/Button/Button';
import CatFact from './layouts/CatFact/CatFact';
import Agify from './layouts/Agify/Agify';
import './App.css';

const queryClient = new QueryClient();

export const App = () => {

  const platform = usePlatform();
  const [title, setTitle] = useState<string>('Выбери приложение');
  const [component, setComponent] = useState<ReactElement>();

  const openCatFact = () => {
    setComponent(
      <CatFact/>
    );
    setTitle('Сейчас открыт Cat Fact');
  }

  const openAgify = () => {
    setComponent(
      <QueryClientProvider client={queryClient}>
        <Agify/>
      </QueryClientProvider>
    );
    setTitle('Сейчас открыт Agify');
  }

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader className='title'>{title}</PanelHeader>
              <Group className='app-buttons'>
                <SimpleCell>
                  <Button className="app-button"
                    name="CAT FACT" 
                    handleClick={openCatFact}
                  />
                </SimpleCell>
                <SimpleCell>
                  <Button className="app-button"
                    name="AGIFY" 
                    handleClick={openAgify}
                  />
                </SimpleCell>
              </Group>
              {component}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};
