import React, {Fragment, useState} from "react";
import {Button, Card, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames"
import BootstrapTable from "react-bootstrap-table-next";
const baseColumns = [
    {
        dataField: 'id',
        text: 'ID',
    },
    {
        dataField: 'sender_id',
        text: 'sender',
    },
    {
        dataField: 'receiver_id',
        text: 'receiver',
    },
    {
        dataField: 'subject',
        text: 'subject',
    },
    {
        dataField: 'created_at',
        text: 'created',
        formatter: ( cell,row, rowIndex) => {
            const date = new Date(cell);

            return date.toLocaleString()
        }
    }
];

const MangeTabs = ({sent,received,deleteMassage,...props}) => {
    const [activeTab, setActiveTab] = useState('sent');


    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    const sentColumns = [...baseColumns,
        {
            dataField:"actions",
            text:'',
            formatter: ( cell,row, rowIndex) => {
                return (
                    <Fragment>
                        <Button color={"danger"} onClick={deleteMassage(row.id,"sent")}>Delete</Button>
                    </Fragment>
                );
            }
        }];
    const receivedColumns = [...baseColumns,
        {
            dataField:"actions",
            text:'',
            formatter: ( cell,row, rowIndex) => {
                return (
                    <Fragment>
                        <Button color={"danger"} onClick={deleteMassage(row.id,"receiver")}>Delete</Button>
                    </Fragment>
                );
            }
        }];
    const expandRow = {
        renderer: row => (
            <div>
                <p>{row.content}</p>
            </div>
        ),
        showExpandColumn: true,

    };


    return (
        <div className={"my-4"}>
            <Nav  tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'sent' })}
                        onClick={() => { toggle('sent'); }}
                    >
                        sent
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'received' })}
                        onClick={() => { toggle('received'); }}
                    >
                        received
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className={'pt-4'} activeTab={activeTab}>

                <TabPane tabId="sent">
                    <BootstrapTable
                        bootstrap4
                        classes={"table-responsive-sm"}
                        data={sent}
                        keyField={"id"}
                        columns={sentColumns}
                        expandRow={expandRow}

                    />
                </TabPane>
                <TabPane tabId="received">
                    <BootstrapTable
                        classes={"table-responsive-sm"}

                        bootstrap4
                        data={received}
                        keyField={"id"}
                        expandRow={expandRow}
                        columns={receivedColumns}
                    />
                </TabPane>
            </TabContent>
        </div>
    );
}
export default MangeTabs