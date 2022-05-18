import React, { useState, useEffect } from "react";
import axios from '../config/axiosUrl';
import * as axiosURLS from '../config/constants';
import { Table } from "antd";
import funelIcon from "../assets/funnel.png"
import sortIcon from "../assets/sort.png";

function DataTable() {
    const [data, setData] = useState([])
    useEffect(() => {
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
    }
    , [])

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            key: 'sno',
            fixed: 'left'
        },
        {
            title: (
                <div style={{ display: "flex", alignItems: "center" }}>
                    State <img src={sortIcon} style={{ marginLeft: "8px", width: '20px' }} />
                </div>
            ),
            dataIndex: 'state_name',
            key: 'state_name',
            fixed: 'left',
            filters: data.filter(item => item.state_code !== '00').map(item => ({
                text: item.state_name,
                value: item.state_name
            })),
            filterIcon: () => {
                return <img src={funelIcon} alt="filter" width="20px"/>;
            },
            sorter: (a, b) => a.state_name.localeCompare(b.state_name),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.state_name.startsWith(value),
        },
        {
            title: 'Active Cases',
            children: [
                {
                    title: (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            Total <img src={sortIcon} style={{ marginLeft: "8px", width: '20px' }} />
                        </div>
                    ),
                    dataIndex: 'new_active',
                    key: 'new_active',
                    sorter: (a, b) => a.new_active - b.new_active
                }, {
                    title: 'Change since yesterday',
                    dataIndex: 'active',
                    key: 'active',
                    render: (text, record) => {
                        return (
                            <span>
                                {text >= record.new_active ? <span style={{ color: 'green' }}>-{text-record.new_active}</span> : <span style={{ color: 'red' }}>+{record.new_active-text}</span>}
                            </span>
                        )
                    }
                }
            ]
        },
        {
            title: 'Cured/Discharged/Migrated',
            children: [
                {
                    title: (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            Cumulative <img src={sortIcon} style={{ marginLeft: "8px", width: '20px' }} />
                        </div>
                    ),
                    dataIndex: 'new_cured',
                    key: 'new_cured',
                    sorter: (a, b) => a.cured - b.cured
                },
                {
                    title: 'Changes since Yesterday',
                    dataIndex: 'cured',
                    key: 'cured',
                    render: (text, record) => {
                        return (
                            <span>
                                {text > record.new_cured ? <span style={{ color: 'red' }}>-{text-record.new_cured}</span> : <span style={{ color: 'green' }}>+{record.new_cured-text}</span>}
                            </span>
                        )
                    }
                }      
            ]
        },
        {
            title: 'Deaths',
            children: [
                {
                    title: (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            Cumulative <img src={sortIcon} style={{ marginLeft: "8px", width: '20px' }} />
                        </div>
                    ),
                    dataIndex: 'new_death',
                    key: 'new_death',
                    sorter: (a, b) => a.new_death - b.new_death
                },
                {
                    title: 'Changes Since Yesterday',
                    children: [
                        {
                            title: 'Death During Day (a) ',
                            dataIndex: 'death',
                            key: 'death',
                            render: (text, record) => {
                                return (
                                    <span>
                                        {text >= record.new_death ? <span style={{ color: 'green' }}>-{text-record.new_death}</span> : <span style={{ color: 'red' }}>+{record.new_death-text}</span>}
                                    </span>
                                )
                            }
                        }, {
                            title: "Death Reconciled (b)",
                            dataIndex: 'death_reconsille',
                            key: 'death_reconsille',
                            render: (text, record) => {
                                return (
                                    <span style={{ color: 'red' }}>
                                        {text ? "+" + text : ""}
                                    </span>
                                )
                            }
                        }, {
                            title: (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    Total (a+b) <img src={sortIcon} style={{ marginLeft: "8px", width: '20px' }} />
                                </div>
                            ),
                            dataIndex: 'total',
                            key: 'total',
                            sorter: (a, b) => a.total - b.total,
                            render: (text, record) => {
                                return (
                                    <span style={{ color: 'red' }}>
                                        {text ? "+" + text: ""}
                                    </span>
                                )
                            }
                        }
                    ]
                }
            ]
        }
        ]



    return (
        <div style={{ maxWidth: '100%', overflow: 'scroll' }}>
            <Table columns={columns} dataSource={data.filter(el => el.state_name)} bordered pagination={false} footer={() => <span>
                Total Active Cases: {data.filter(el => el.state_code === "00")[0]?.new_active}
                &nbsp; &nbsp; Total Deaths: {data.filter(el => el.state_code === "00")[0]?.new_death }
            </span>} />
        </div>
    );
}

export default DataTable;