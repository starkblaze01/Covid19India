

import React from "react";
import "App.css";
import DataTable from './components/DataTable';

import {Layout} from 'antd';

const { Header, Footer, Content } = Layout;


const App = () => (
    <Layout>
        <Header style={{ color: 'white' }}>Covid-19 Tracker</Header>
        <Content style={{ background: 'white' }}>
            <DataTable />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Icons picked from : <a href="https://icons8.com/">Icons8</a>
        </Footer>
    </Layout>
);

export default App;