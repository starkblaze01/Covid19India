

import React, { useState, useEffect } from "react";
import "App.css";
import DataTable from './components/DataTable';
import Map from './components/Map';
import axios from './config/axiosUrl';
import * as axiosURLS from './config/constants';
import {Layout} from 'antd';
const { Header, Footer, Content } = Layout;


const App = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState('table');
    useEffect(() => {
        axios.get(window.location.origin + axiosURLS.COVID_DATA_URL).then(res => {
                setData(res.data.map(el => {
                    let tempObj = el;
                    tempObj.key = el.state_code;
                    return tempObj;
                }))
            }).catch(err => {
                console.log(err);
                axios.get(axiosURLS.STATE_WISE_DATA)
            .then(res => {
                setData(res.data.map(el => {
                    let tempObj = el;
                    tempObj.key = el.state_code;
                    return tempObj;
                }))
            }).catch(err => {
                console.log(err)
                alert('Something went wrong')
            });
            })

        
    }
    , [])

    return <Layout>
        <Header style={{ color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                Covid-19 Tracker
            </div>
            <div style={{ cursor: 'pointer', border: '1px solid white', padding: '0px 10px', background: page==='table' ? 'blue' : 'black'}} onClick={() => setPage('table')}>
                Table View
            </div>
            <div style={{ cursor: 'pointer', border: '1px solid white', padding: '0px 10px', background: page === 'map' ? 'blue' : 'black' }} onClick={() => setPage('map')}>
                Map View
            </div>
        </Header>
        <Content style={{ background: 'white', height: page === 'map' ? '100vh': '80%' }}>
            {page === 'map' ? <Map data={data} /> : <DataTable data={data} /> }
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Icons picked from : <a href="https://icons8.com/">Icons8</a>
            &amp; <a href="https://www.iconfinder.com/">IconFinder</a>
        </Footer>
    </Layout>
}

export default App;