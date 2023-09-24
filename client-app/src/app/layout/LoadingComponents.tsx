import React from "react";
import { Puff } from 'react-loader-spinner';
import { Dimmer } from "semantic-ui-react";

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({ inverted = true, content = "Loading" }: Props) {
    return (
        <Dimmer active={true} inverted={inverted} >
            <Puff
                height="80"
                width="80"
                radius={1}
                color="#4fa94d"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </Dimmer>
    )
}