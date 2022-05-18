import React, { useState, useEffect } from "react";
import axios from '../config/axiosUrl';
import * as axiosURLS from '../config/constants';
import Table from "antd/lib/table";

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
            title: 'State',
            dataIndex: 'state_name',
            key: 'state_name',
            fixed: 'left',
            // sortOrder: sort.state_name ? sort.state_name : null,
            sorter: (a, b) => a.state_name.localeCompare(b.state_name),
        },
        {
            title: 'Active Cases',
            children: [
                {
                    title: 'Total',
                    dataIndex: 'new_active',
                    key: 'new_active',
                    // sortOrder: sort.active ? sort.active : null,
                    sorter: (a, b) => a.active - b.active
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
                    title: 'Cumulative',
                    dataIndex: 'new_cured',
                    key: 'new_cured',
                    // sortOrder: sort.cured ? sort.cured : null,
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
                    title: 'Cumulative',
                    dataIndex: 'new_death',
                    key: 'new_death',
                    // sortOrder: sort.total ? sort.total : null,
                    sorter: (a, b) => a.total - b.total
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
                            title: 'Death Reconciled (b)',
                            dataIndex: 'death_reconsille',
                            key: 'death_reconsille',
                            // sortOrder: sort.death_reconsille ? sort.death_reconsille : null,
                            sorter: (a, b) => a.death_reconsille - b.death_reconsille,
                            render: (text, record) => {
                                return (
                                    <span style={{ color: 'red' }}>
                                        {text ? "+" + text : ""}
                                    </span>
                                )
                            }
                        }, {
                            title: 'Total (a+b)',
                            dataIndex: 'total',
                            key: 'total',
                            // sortOrder: sort.total ? sort.total : null,
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
        <div style={{ maxWidth: '800px' }}>
            <Table columns={columns} dataSource={data.filter(el => el.state_name)} bordered pagination={false} footer={() => <span>
                Total Active Cases: {data.filter(el => el.state_code === "00")[0]?.new_active}
            </span>} />
        </div>
    );
}

export default DataTable;