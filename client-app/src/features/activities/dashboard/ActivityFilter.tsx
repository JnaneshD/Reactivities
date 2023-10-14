import React, { Fragment } from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters()
{
    return (
        <Fragment>
        <Menu vertical size='large' style={{width: '100%', marginTop: '26px'}}>
            <Header icon='filter' attached color="orange" content='Filters'></Header>
            <Menu.Item content='All Activities'/>
            <Menu.Item content='Im Going'/>
            <Menu.Item content="I'm Hosting"/>
        </Menu>
        <Calendar></Calendar>
        </Fragment>
    )
}