import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { styled } from '@mui/system';
import * as React from 'react';
import '../../../fonts.css';
import { demoEleList } from './demoEle/demoEleList';


export default function UnstyledTabsCustomized() {
  return (
    <Tabs defaultValue={1}>
      <TabsList>
        <Tab value={1}>Buttons</Tab>
        <Tab value={2}>Text Box</Tab>
        <Tab value={3}>Headers</Tab>
        <Tab value={4}>Anchors</Tab>
        <Tab value={5}>Image</Tab>
      </TabsList>
      <TabPanel value={1}>{demoEleList('buttons')}</TabPanel>
      <TabPanel value={2}>Second page</TabPanel>
      <TabPanel value={3}>Third page</TabPanel>
    </Tabs>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(BaseTab)`
  color: rgba(37, 39, 63, 0.30);
  cursor: pointer;
  font-family: 'Poppins';
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  line-height: 1.5;
  padding: 10px 20px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: var(--primary-color);
    color:white;
  }

  &.${tabClasses.selected} {
    background-color: var(--primary-color);
    color: white;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: rgba(1, 126, 250, 0.10);
  border-radius: 12px;
  margin: 16px 0 ;
  padding: 8px 0;
  gap: 60px;
  display: flex;
  align-items: center;
  place-content: space-between center;
  `,
);
