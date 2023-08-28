import { useRouter } from 'next/router'
import Link from "next/link"
import Layout  from '../../components/Layout';
import { AppBar, Tab, Tabs, Typography, Box, Container } from '@mui/material';
import React, { useState } from 'react';
import  ContractFunctionParser from '../../components/ABIParser';

interface TabProp{
  children:React.ReactNode;
  value:number;
  index:number;
}

function TabPanel(props:TabProp) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (


            <ContractFunctionParser/>
      )}
    </div>
  );
}


export default function TimeLockPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue:number) => {
    setValue(newValue);
  };
  const  router = useRouter();
  const  {TimeLock}  = router.query;  
  const exploreLink = "https://mumbai.polygonscan.com/address/"+TimeLock;
  return (
    <Layout>
      <div className="text-neutral-900"></div>
        <p className="text-neutral-900">explore: <Link href={exploreLink}>{TimeLock}</Link></p>

        <Container maxWidth="md">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Tab 1" id="tab-0" />
          <Tab label="Tab 2" id="tab-1" />
          <Tab label="Tab 3" id="tab-2" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Content for Tab 1
      </TabPanel>
      <TabPanel value={value} index={1}>
        Content for Tab 2
      </TabPanel>
      <TabPanel value={value} index={2}>
        Content for Tab 3
      </TabPanel>
    </Container>
    </Layout>
  )
}

